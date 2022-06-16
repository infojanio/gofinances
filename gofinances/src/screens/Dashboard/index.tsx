import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])
  const dataKey = '@gofinances:transactions'

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
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

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
    // async function removeAll() {
    //  await AsyncStorage.removeItem(dataKey)
    //}
    //removeAll()
  }, [])

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/59238443?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName> Jânio </UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighLigthCards>
        <HighLigthCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />

        <HighLigthCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />

        <HighLigthCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 16 de abril"
        />
      </HighLigthCards>

      <Transactions>
        <Title>Listagem</Title>
      </Transactions>

      <TransactionList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard data={item} />}
      />
    </Container>
  )
}
