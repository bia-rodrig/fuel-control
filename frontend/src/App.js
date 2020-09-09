import React, { useState, useEffect }from 'react';
import api from './services/api'

import './App.css';
import backgroundImage from './assets/gas.png'

import Header from './components/Header';

function App(){

    const [registers, setRegisters] = useState([]);

    useEffect(() => {
        api.get('/registers').then(res => {
            setRegisters(res.data);
        })
    }, []);

    async function handleAddRegister(){

        const res = await api.post('registers',{
            data: Date.now(),
            currentKm: "10000",
            liters: "50",
            priceLiter: "3.50",
            totalValue: "175",
            gasInfo: "Ipiranga Ana Costa"
        });

        const register = res.data;
        setRegisters([...registers, register]);
    }

    return (
        <>
            <Header title="Registers"/>

            <img src={backgroundImage}/>
            <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Km atual</th>
                            <th>Litros</th>
                            <th>$ por litro</th>
                            <th>Valor total</th>
                            <th>Informações do posto</th>
                        </tr>
                    </thead>
                    <tbody>
                        { registers.map(register => 
                            <tr key={register.id}>
                                <td>{register.data}</td>
                                <td>{register.currentKm}</td>
                                <td>{register.liters}</td>
                                <td>{register.priceLiter}</td>
                                <td>{register.totalValue}</td>
                                <td>{register.gasInfo}</td>
                            </tr>
                        )}
                    </tbody>
            </table>

            <button type="button" onClick={handleAddRegister}>Adicionar Registro</button>
        </>);
}

export default App;