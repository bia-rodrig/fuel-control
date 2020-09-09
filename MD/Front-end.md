# Front-end

Parte web, utilizando react, babel e webpack.

## Ambiente

**Babel**: converte (transpila) código do React para um código que o Browser entenda.

**Webpack:** para cada tipo de aquivo (.js, ,css, png, .etc), precisa converter o arquivo de uma forma diferente.

**Loders:** babel-loader, css-loader, image-loader, file-loader (são utilizados pelo webpack para dar sentido ao javascript).

Rodar comandos listados abaixo, para instalar pacotes necessários para a execução da aplicação.

- `yarn init -y` - Criação do *package.json*
- `yarn add react react-dom` - Instalação do *react* e *react-dom* (este faz integração do react com a DOM. Indica na web que é utilizado react)
- `yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli`
- `yarn add @babel/cli`
- `yarn add babel-loader`
- `yarn add webpack-dev-server -D`
- `yarn add style-loader css-loader` - Instalação do loader para estilização
- `yarn add file-loader` - Instalação do loader para arquivos
- `yarn add axios`
- `yarn add @babel/plugin-transform-runtime -D`

---

## Arquivos e pastas

Criar arquivos e pastas conforme estrutura:

```bash
├── 📄babel.config.js
├── 📁public 
│		└── 📄index.html
├── 📁src
│   ├── 📄App.css
│   ├── 📄App.js
│   ├── 📁assets
│   │   └── gas.png
│   ├── 📁components
│   │   └── 📄Header.js
│   ├── 📄index.js
│   └── 📁services
│       └── 📄api.js
└──  📄webpack.config.js
```

---

## Conteúdo arquivos

### babel.config.js

Babel é o responsável por converter o código React para um JavaScript que os Browsers entendam.

```jsx
module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-transform-runtime'
	]
};
```

### index.html

Página HTML.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>⛽ FuelControl</title>
</head>
<body>
    <div id="app"></div>
    <script src="bundle.js"></script>    
</body>
</html>
```

### App.css

Estilização css.

```css
*{
	margin: 0;
	padding: 0;
	outline: 0;
	box-sizing: border-box;
}

body{
	background: #f5f5f5;
	font: 14px sans-serif;
	color: #333333;
}

table, th, td {
    border: 1px solid black;
  }

table{
    border-collapse: collapse;
    width: 50%;
}

th, td{
    text-align: center;
}
```

### App.js

```jsx
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
                            <th>$ por lt</th>
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
```

### Header.js

```jsx
import React from 'react';

export default function Header({title}){
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}
```

### index.js

Quem faz a conexão da parte React com o html.

```jsx
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(<App />, document.getElementById('app'));
```

### api.js

Comunicação com serviços externos (backend através de api)

```jsx
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000' //porta do backend
});

export default api;
```

### webpack.config.js

```jsx
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'public'),
    },
    module:{
        rules: [
            {
               test: /\.js$/, //todos arquivos .js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' //serão convertidos pelo babel
                }
            },
            {
                test: /\.css$/, //todos arquivos .css
								exclude: /node_modules/,
								use:[
									{ loader: 'style-loader' }, //convertidos pelos loaders
									{ loader: 'css-loader' },   //de estilização
								]
            },
						//loader de imagens
						{
							test: /.*\.(gif|png|jpe?g)$/i, //todos arquivos de imagem
							use:{
								loader: 'file-loader', //carregados pelo loader de arquivos
							}
						}
        ]
    }
}
```

---

## Rodar projeto

Comando: `yarn start`