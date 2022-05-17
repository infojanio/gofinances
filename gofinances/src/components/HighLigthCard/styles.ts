import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
background-color: #ff872c;  //#ffffff
border-radius: 5px;
padding: 19px 23px;
padding-bottom: ${RFValue(42)}px;
margin-right: 16px;

height: 300px;
`;
//background-color: ${({ theme })=> theme.colors.shape};

export const Header = styled.View`
flex-direction: row; //alinha lado a lado
justify-content: space-between; //preenche aos cantos
align-items: flex-start; //alinha ao topo
`;
export const Title = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
color: #000000;
`;

export const Icon = styled(Feather)`
font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`

`;
export const Amount = styled.Text`
font-family: Poppins_500Medium;
font-size: ${RFValue(32)}px;
color: #000000;
margin-top: 38px; 
`;
//font-family: ${({theme})=> theme.fonts.medium};
//color: ${({ theme })=> theme.colors.text_dark};


export const LastTransaction = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(12)}px;
color: #969cb2;
`;
//font-family: ${({theme})=> theme.fonts.regular};
//color: ${({ theme })=> theme.colors.text};
