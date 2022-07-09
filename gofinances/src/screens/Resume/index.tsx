import React, { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'

import { HistoryCard } from '../../components/HistoryCard'
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadingContainer,
} from './styles'

import { categories } from '../../../utils/categories'

interface TransactionData {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const theme = useTheme()

  //lidar com alteração da data
  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1) //função da lib date-fns (selectedDate + 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1) //função da lib date-fns (selectedDate - 1)
      setSelectedDate(newDate)
    }
  }

  //recupera os dados
  async function loadData() {
    setIsLoading(true) //ativa o loading

    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    //filtrar as despesas
    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === 'negative' && //pega as transações negativas
        new Date(expensive.date).getMonth() === selectedDate.getMonth() && //verifica se o mês é igual ao selecedDate
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(), //verifica se o ano é o mesmo da data selecionada
    )

    //somar as despesas
    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount)
      },
      0,
    )

    // console.log(expensivesTotal)

    const totalByCategory: CategoryData[] = []

    //percorre todas as categorias
    categories.forEach((category) => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        //descobrir a porcentagem de cada categoria
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        })
      }
    })

    setIsLoading(false) //finaliza loading
    setTotalByCategories(totalByCategory)
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate]), //atualiza o gráfico mês a mês
  )

  return (
    <Container>
      <Header>
        <Title> Resumo por categoria </Title>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}
