import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as Google from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSession from 'expo-auth-session'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextData {
  user: User
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  
  //loga com conta da google
  async function signInWithGoogle() {
    try {

      const result = await Google.logInAsync({
        iosClientId: '313172291784-8p1i8cee4o3a2r5bsd0agl2450hea003.apps.googleusercontent.com', 
        androidClientId: '313172291784-ha7ns55u1cgriq737p54emel0ddv6bfp.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

   

      if (result.type === 'success') {
        const userLogged = {
        //se deu certo, salva os dados do usuário
        
          id: String(result.user.id),
          email: result.user.email,
          name: result.user.name,
          photo: result.user.photoUrl, 
      }

      setUser(userLogged)
      await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))
    }
    } catch (error) {
      throw new Error(error)
    }}

    //loga com conta da apple
    async function signInWithApple() {
      try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        })

        if (credential) {
          const userLogged = {
            id: String(credential.user),
            email: credential.email!, //a exclamação garante que sempre vai buscar um dado
            name: credential.fullName!.givenName!,
            photo: undefined,
          }

          //salva o estado
          setUser(userLogged)
          await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))

        }
      } catch (error) {
        throw new Error(error)
      }
    }
  

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple
      }}
    >
      {children}
    </AuthContext.Provider>
  )


function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }

/*
import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { UserInfo } from '../screens/Dashboard/styles'

import { LogBox } from 'react-native'

//web: 313172291784-htrkhibqvv0d6n69abejrpi6q0alrpvf.apps.googleusercontent.com
//ios: 313172291784-8p1i8cee4o3a2r5bsd0agl2450hea003.apps.googleusercontent.com
//android: 313172291784-ha7ns55u1cgriq737p54emel0ddv6bfp.apps.googleusercontent.com

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextData {
  user: User
  signInWithGoogle(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as IAuthContextData)

WebBrowser.maybeCompleteAuthSession()

//
function AuthProvider({ children }: AuthProviderProps) {
  const [acessToken, setAcessToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [request, response, promtAsunc] = Google.useIdTokenAuthRequest({
    clientId:
      '313172291784-htrkhibqvv0d6n69abejrpi6q0alrpvf.apps.googleusercontent.com',
    iosClientId:
      '313122971784-8p1i8cee4o3a2r5bsd0agl2450hea003.apps.googleusercontent.com',
    androidClientId:
      '313172291784-ha7ns55u1cgriq737p54emel0ddv6bfp.apps.googleusercontent.com',
  })
  //const [user, setUser] = useState<User>({} as User)

  //loga com conta da google
  // async function signInWithGoogle() {
  //try {
  React.useEffect(() => {
    if (response?.type === 'success') {
      setAcessToken(response.authentication?.accessToken)
      acessToken && fetchUserInfo()
    }
  }, [response, acessToken])
  // } catch (error) {
  //  throw new Error(error)
  // }

  async function fetchUserInfo() {
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${acessToken}` },
    })
    const useInfo = await response.json()
    setUser(useInfo)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }

*/
