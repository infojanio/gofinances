import React from 'react';
import {ThemeProvider} from 'styled-components';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';



import theme from './src/global/styles/theme';
import {Dashboard} from './src/screens/Dashboard';
import AppLoading from 'expo-app-loading';


export default function App() {
   //carrega as fontes 
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,  
    });

    //se a fonte ainda não foi carregada, vai pra tela de loading..
    if(!fontsLoaded) { 
        return <AppLoading/>

    }



return (
<ThemeProvider theme={theme}>
<Dashboard />
</ThemeProvider>
);
}