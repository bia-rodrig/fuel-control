# Mobile

Parte mobile, utilizando React-Native e emulador android.

## Ambiente

- `npx react-native init mobile` - cria pasta mobile com toda a estrutura
- `yarn add axios`
- Rodar projeto :

---

## Arquivos e pastas

Arquivos e pastas que foram criadas manualmente

```bash
├── 📁src
│	  ├── 📄index.js
│   └── 📁services
│       └── 📄api.js
└──  index.js
```

---

## Conteúdo arquivos

### **src/index.js**

```jsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View , FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App(){
    const [registers, setRegisters] = useState([]);

    useEffect(() => {
        api.get('registers').then(res => {
            console.log(res.data);
            setRegisters(res.data);
        })
    }, []);

    async function handleAddRegister(){
        const res = await api.post('registers', {
            data: todayDate(),
            currentKm: "10000",
            liters: "50",
            priceLiter: "3.50",
            totalValue: "175",
            gasInfo: "Ipiranga Ana Costa"
        });

        console.log(res);

        const register = res.data

        setRegisters([...registers, register])
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#2f3036'/>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Fuel Control</Text>
                </View>
                <FlatList 
                    style={styles.registersList}
                    data={registers}
                    keyExtractor={register => register.id}
                    renderItem = {({ item: register }) => (
                    <Text style={styles.register}>{register.data} - {register.currentKm} - {register.liters} - {register.priceLiter}</Text>
                    )}
                />
                <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button} 
                onPress={handleAddRegister}
                >
                    <Text style={styles.buttonText}>Adicionar registro</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2f3036',
    },
    containerTitle:{
        alignItems:'center',
        marginTop: 10
    },
    title:{
        color: '#c7c8ca',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    registersList:{
        padding: 30
    },
    register:{
        color: '#FFF',
        fontSize: 14,
    },
    button:{
        backgroundColor: '#38c75b',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2f3036'
    }
});

function todayDate(){
    var data = new Date(),
        day  = data.getDate().toString(),
        dayF = (day.length == 1) ? '0' + day : day,
        month  = (data.getMonth()+1).toString(), //+1 getMonth January starts at 0
        monthF = (month.length == 1) ? '0' + month : month,
        yearF = data.getFullYear();
    return dayF + "-" + monthF + "-" + yearF;
}
```

### api.js

```jsx
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000'
});

export default api;
```

### index.js

```jsx
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

---

## Rodar projeto

- Windows:
    - Terminal 1: `react-native start`
    - Terminal 2: `react-native run-android`
- Linux:
    - Terminal 1: `react-native start`
    - Terminal 2: `npx react-native run-android`