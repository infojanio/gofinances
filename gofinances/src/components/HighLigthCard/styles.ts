import styled, {css} from "styled-components/native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
background-color: #ffffff; 

border-radius: 5px;
padding: 19px 23px;
padding-bottom: ${RFValue(42)}px;
margin-right: 16px;

`;
/*
background-color: ${({theme, type})=> 
type === 'total' ? theme.colors.secundary : theme.colors.shape};
condição para mudar a cor de fundo do container: 

*/
export const Header = styled.View`
flex-direction: row; //alinha lado a lado
justify-content: space-between; //preenche aos cantos
align-items: flex-start; //alinha ao topo
`;

/* troca o color do Title
color: ${({theme, type})=> 
type === 'total' ? theme.colors.shape : theme.colors.dark};
*/
export const Title = styled.Text<TypeProps>`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
color: #000000;
`;


export const Icon = styled(Feather)<TypeProps>`
font-size: ${RFValue(40)}px;

${({type}) => type === 'up' && css`
color: #12a454; 
`};

${({type}) => type === 'down' && css`
color: #e83f5b;
`};

${({type}) => type === 'total' && css`
color: #33335;
`};
`;

export const Footer = styled.View`

`;

/* troca o color do Amount
color: ${({theme, type})=> 
type === 'total' ? theme.colors.shape : theme.colors.text_dark};
*/
export const Amount = styled.Text<TypeProps>`
font-family: Poppins_500Medium;
font-size: ${RFValue(32)}px;
color: #000000;
margin-top: 38px; 
`;
//font-family: ${({theme})=> theme.fonts.medium};
//color: ${({ theme })=> theme.colors.text_dark};



/* troca o color do LastTransaction
color: ${({theme, type})=> 
type === 'total' ? theme.colors.shape : theme.colors.text};
*/
export const LastTransaction = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(12)}px;
color: #969cb2;
`;
//font-family: ${({theme})=> theme.fonts.regular};
//color: ${({ theme })=> theme.colors.text};
