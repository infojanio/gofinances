import React, { useContext } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { FooterWrapper } from '../../components/SignInSocialButton/styles'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from './styles'

export function SignIn() {
  const { user } = useAuth() //contexto de autenticação
  console.log(user)

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(67)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />

          <SignInSocialButton title="Entrar com Google" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
