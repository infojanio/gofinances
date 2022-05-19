import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighLigthCard } from '../../components/HighLigthCard';
import { TransactionCard } from '../../components/TransactionCard';

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
  TransactionList
} from './styles';


export function Dashboard() {

  const data = [
    {
type: "positive",
title: "Desenvolvimento de site",
amount: "R$ 12.000,00",
category: {
name: 'Vendas',
icon: 'dollar-sign'
},
date: "19/04/2022"
  },

  {
    type: "negative",
    title: "Hamburguer Pizzy",
    amount: "R$ 59,00",
    category: {
    name: 'Alimentação',
    icon: 'coffee'
    },
    date: "19/04/2022"
      },

      {
        type: "negative",
        title: "Aluguel de apartamento",
        amount: "R$ 1.200,00",
        category: {
        name: 'Casa',
        icon: 'shopping-bag'
        },
        date: "19/04/2022"
          }
];

  return (
    
    <Container> 

      <Header>
     <UserWrapper>  
     <UserInfo>
      <Photo source={{uri: 'https://avatars.githubusercontent.com/u/59238443?v=4'}}/>
      <User>
        <UserGreeting>Olá, </UserGreeting>
        <UserName> Jânio </UserName>
      </User>
     </UserInfo>  

      <Icon name='power' />
     </UserWrapper> 
      </Header> 

      <HighLigthCards>

<HighLigthCard 
      type='up'
      title="Entradas"
      amount="R$ 17.400,00"
      lastTransaction='Última entrada dia 13 de abril' 
      />

<HighLigthCard 
      type='down'
      title="Saídas"
      amount="R$ 1.259,00"
      lastTransaction='Última saída dia 03 de abril' 
      />

<HighLigthCard 
      type='total'
      title="Total"
      amount="R$ 16.141,00"
      lastTransaction='01 a 16 de abril' 
      />

</HighLigthCards>

<Transactions>
    <Title>Listagem</Title>
</Transactions>

    <TransactionList 
    data={data}
    renderItem={({ item })=> <TransactionCard data={item} /> }    
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: getBottomSpace()
    }}
    />  



  
    </Container>
    
  )
}

