import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const Container = styled.View`
flex: 1;
background-color: #f0f2f5;
`;
//background-color: ${({//theme}) => theme.colors.background};

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;
background-color: #5636d3;
align-items: center;
justify-content: center;
`;
//background-color: ${({theme}) => theme.colors.primary};

export const UserInfo = styled.View `
flex-direction: row;
align-items: center;
`;

export const Photo = styled.Image `
width: ${RFValue(55)}px;
height: ${RFValue(55)}px;

border-radius: 10px;
`;

export const User = styled.View `
margin-left: 17px;
`;

export const UserGreeting = styled.Text `
color: #ffffff;
font-size: ${RFValue(18)}px;
font-family: ${({theme})=> theme.fonts.regular};
`;
//color: ${({theme})=> theme.colors.shape};

export const UserName = styled.Text ``; 