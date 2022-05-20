import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
flex: 1;
background-color: #f0f2f5;
`;
//background-color: ${({theme})=> theme.colors.background};

export const Header = styled.View`
background-color: #5636d3;
width: 100%;
height: ${RFValue(113)}px;

align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
`;
//background-color: ${({theme})=> theme.colors.primary};

export const Title = styled.Text`
font-family: Poppins_400Regular;
font-size: ${RFValue(18)}px;
color: #ffffff;
`;
//font-family: ${({theme})=> theme.fonts.regular}
//color: ${({theme})=> theme.colors.shape};

export const Form = styled.View`
flex: 1;
width: 100%;
padding: 24px;
`;
