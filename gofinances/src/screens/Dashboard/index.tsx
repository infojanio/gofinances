import React from 'react';
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
  Title
} from './styles';


export function Dashboard() {
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

<TransactionCard/>
  
    </Container>
    
  )
}

