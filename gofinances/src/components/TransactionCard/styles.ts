import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionProps {
    type: "positive" | "negative";
}

export const Container = styled.View`
background-color: #f0f2f5;
border-radius: 5px;

padding: 17px 24px;
margin-bottom: 16px;
`;

export const Title = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
`; 
//font-family: ${({theme})=> theme.fonts.medium};  PAREI NO MIN. -2:33

export const Amount = styled.Text<TransactionProps>`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
color: ${({theme, type})=> 
type === 'positive' ? '#12a454' : '#e83f5b'};

margin-top: 2px;
`; 
//type === 'positive' ? theme.colors.success : theme.colors.attention};

export const Footer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 19px;
`; 

export const Category = styled.View`
flex-direction: row;
align-items: center;
`;
export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;
color: #969cb2;
`;

export const CategoryName = styled.Text`
font-size: ${RFValue(14)}px;
color: #969cb2;
margin-left: 17px;

`; 

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
color: #969cb2;


`;