import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
width: 100%;
padding: 16px 18px; 
font-size: ${RFValue(14)}px;
font-family: Poppins_400Regular;
color: #000000;
background-color: '#ffffff';
border-radius: 5px;
margin-bottom: 8px;
`;
//font-family: ${({theme})=> theme.fonts.regular}
//background-color: ${({theme})=> theme.colors.text_dark};
//background-color: ${({theme})=> theme.colors.shape};
