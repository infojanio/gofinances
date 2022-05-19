import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';


export const Container = styled.View`
flex: 1;
background-color: #f0f2f5;
`;
//background-color: ${({//theme}) => theme.colors.background};

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;

background-color: #5636d3;

justify-content: center; 
align-items: flex-start;
flex-direction: row;
`;
//background-color: ${({theme}) => theme.colors.primary};

export const UserWrapper = styled.View `
width: 100%;
padding: 0px 24px;

flex-direction: row;
justify-content: space-between;
align-items: center;
`;
//margin-top: ${getStatusBarHeight()+ RFValue(28)}px; //corrigir margem em iphone
//0 cima-embaixo - 24 direita-esquerda
//padding-left: 24px;
//padding-right: 0px;

export const UserInfo = styled.View `
flex-direction: row;
align-items: center;
`;

export const Photo = styled.Image `
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;

border-radius: 10px;
`;

export const User = styled.View `
margin-left: 17px;
`;

export const UserGreeting = styled.Text `
color: #ffffff;
font-size: ${RFValue(18)}px;
font-family: Poppins_400Regular;
`;
//font-family: ${({theme})=> theme.fonts.regular};
//color: ${({theme})=> theme.colors.shape};

export const UserName = styled.Text `
color: #ffffff;
font-size: ${RFValue(18)}px;
font-family: Poppins_400Regular;
`;
//font-family: ${({theme})=> theme.fonts.bold};
//color: ${({theme})=> theme.colors.shape};

export const Icon = styled(Feather)`

color: #ff872c;
font-size: ${RFValue(24)}px;
`;
//color: ${({theme})=> theme.colors.fonts.secundary};


export const HighLigthCards = styled.ScrollView.attrs({ 
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle:{paddingHorizontal:24}
    })` 
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
    `;

export const Transactions = styled.View`
//flex: 1%;
padding: 0 24px;
margin-top: ${RFPercentage(12)}px;
//background-color: red;
`; 

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: Poppins_400Regular;
margin-bottom: 16px;
`; 
//font-family: ${({theme})=> theme.fonts.regular};

export const TransactionList = styled.FlatList`
background-color: red;
padding: 1%;
`;