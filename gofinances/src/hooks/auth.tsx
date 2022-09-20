import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as AuthSession from 'expo-auth-session'

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['EventEmitter.removeListener'])

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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  /*
   */
  //loga com conta da google
  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        '947512581914-2sqd54jm2lk5u2sbghbi05s1v0edmgds.apps.googleusercontent.com' //id grejaninflorencio

      //  '686914996065-eg43f54mufblo4rdr0qt40s43db8ap7n.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@grejaninflorencio/gofinances'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email') //usa-se o encodeURI para que o espaço não quebre a busca

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        )

        const userInfo = await response.json()
        console.log(userInfo)

        //se deu certo, salva os dados do usuário
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        })
      }

      //console.log('deu certo')

      //  AuthSession.startAsync({ authUrl }) //endpoint de autenticação da google
    } catch (error) {
      throw new Error(error)
    }
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
