import React from 'react';
import { HighLigthCard } from '../../components/HighLigthCard';

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
  HighLigthCards 
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

      <HighLigthCards 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      >

      <HighLigthCard />
      <HighLigthCard />
      <HighLigthCard />

      </HighLigthCards>
    </Container>
    
  )
}

