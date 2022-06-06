import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
  type: 'up' | 'down' | 'total'
}
/*condição para mudar a cor de fundo do container:*/
export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secundary : theme.colors.shape};

  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

/* Altera a cor do title*/

export const Title = styled.Text<TypeProps>`
  font-family: Poppins_400Regular;
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};

  ${({ type }) =>
    type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};

  ${({ type }) =>
    type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.background};
    `};
`

export const Footer = styled.View``

// troca o color do Amount
export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  margin-top: 38px;
`
// font-family: Poppins_500Medium;

// troca o color do LastTransaction
export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`
//color: ${({ theme })=> theme.colors.text};
//font-family: Poppins_400Regular;
