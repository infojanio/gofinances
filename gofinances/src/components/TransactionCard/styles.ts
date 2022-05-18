import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
background-color: #f0f2f5;
border-radius: 5px;

padding: 17px 24px;
`;

export const Title = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
`; 
//font-family: ${({theme})=> theme.fonts.medium};

export const Amount = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(14)}px;
margin-top: 2px;
`; 

export const Footer = styled.View`
flex-direction: row;
align-content: space-between;
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