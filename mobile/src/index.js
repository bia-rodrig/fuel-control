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