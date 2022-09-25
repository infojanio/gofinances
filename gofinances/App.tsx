import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react'
import { StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading'
import { AuthProvider, useAuth } from './src/hooks/auth'
import { ThemeProvider } from 'styled-components'
import { Routes } from './src/routes'

import { NavigationContainer } from './src/routes'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { AppRoutes } from './src/routes/app.routes'
import { SignIn } from './src/screens/SignIn'
import { Dashboard } from './src/screens/Dashboard'
import { Register } from './src/screens/Register'

export default function App() {
  //carrega as fontes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const { userStorageLoading } = useAuth()

  //se a fonte ainda não foi carregada, vai pra tela de loading..
  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
