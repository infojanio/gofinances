import React, { useEffect, useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { InputForm } from '../../components/Form/InputForm'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

interface FormData {
  name: string
  amount: string
}

//biblioteca yup, fazer validação de campos
const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),

  amount: Yup.number()
    .typeError('Informe um valor númerico!')
    .positive('Informe um valor positivo!'),
})

export function Register() {
  const [transactionType, setTransactionType] = useState()
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const dataKey = '@gofinances:transactions'

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  //Abre o modal de categorias
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  //fecha o modal de categorias
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData): void {
    //Testa se existe tipo de transação
    if (!transactionType) return Alert.alert('Selecione o tipo de transação!')

    //testa se a categoria foi selecionada
    //Testa se existe tipo de transação
    if (category.key === 'category')
      return Alert.alert('Selecione a categoria!')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey) //recupera os dados
      const currentData = data ? JSON.parse(data) : [] //se tiver algo, converte, senão retorna vetor vazio

      const dataFormatted = [...currentData, newTransaction]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      //limpa os campos assim que cadastrar
      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })

      //direciona p/ tela de listagem
      navigation.navigate('Listagem')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar!')
    }

    console.log(newTransaction)
    Alert.alert('Cadastro realizado!')
  }

  //carrega todos os ítens do AsyncStorage
  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)
      console.log(JSON.parse(data!)) //o ponto exclamação no data! força o typescript aceitar que sempre terá algo na variável
    }
    loadData()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title> Cadastro </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />

              <TransactionTypeButton
                type="down"
                title="Saída"
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
