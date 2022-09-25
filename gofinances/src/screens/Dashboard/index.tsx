import React, { useCallback, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'

import { HighLigthCard } from '../../components/HighLigthCard'

import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLigthCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData,
  )

  const theme = useTheme()
  const { signOut, user } = useAuth()

  //filtrar as últimas transações
  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime()),
      ),
    )
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long', year: '2-digit' },
    )}`
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0 //expensive, tradução: custo, despesas

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        //
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        //const date = new Date(item.date)
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      },
    )

    setTransactions(transactionsFormatted)
    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive',
    )
    const lastTransactionExpansives = getLastTransactionDate(
      transactions,
      'negative',
    )

    const totalInterval = `01 a ${lastTransactionExpansives}`

    //cálculo do total
    const total = entriesTotal - expensiveTotal

    setHighlightData({
      //entradas
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },

      //saídas
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpansives}`,
      },

      //total
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    })
    setIsLoading(false)
    // console.log(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
    // linhas abaixo removem os dados, limpando a lista
    //const dataKey = '@gofinances:transactions'
    //AsyncStorage.removeItem(dataKey)
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, []),
  )

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName> {user.name} </UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighLigthCards>
            <HighLigthCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighLigthCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensives?.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighLigthCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighLigthCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
