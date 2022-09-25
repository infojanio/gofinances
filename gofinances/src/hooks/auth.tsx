import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'

import * as AuthSession from 'expo-auth-session'

import * as Google from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'

import AsyncStorage from '@react-native-async-storage/async-storage'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

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
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
  userStorageLoading: boolean
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
  const [userStorageLoading, setUserStorageloading] = useState(true)

  const userStorageKey = '@gofinances:user'
  /*
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
   */

  //loga com conta da google
  async function signInWithGoogle() {
    try {
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

        const userLogged = {
          //se deu certo, salva os dados do usuário
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }
        //se deu certo, salva os dados do usuário
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
      //  AuthSession.startAsync({ authUrl }) //endpoint de autenticação da google
    } catch (error) {
      throw new Error(error)
    }
  }

  //loga com conta da apple
  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log(credential)

      if (credential) {
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!, //a exclamação garante que sempre vai buscar um dado
          name,
          photo,
        }

        //salva o estado
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  //deslogar
  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  //carrega as informações do asynStorage
  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey)

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User
        setUser(userLogged)
      }
      setUserStorageloading(false)
    }
    loadUserStorageDate() //após atualizar volta p/ tela autenticada
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
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
