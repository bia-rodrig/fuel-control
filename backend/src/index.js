const express = require ('express');
const cors =require('cors');
const { uuid, v4 } = require('uuidv4');

const app = express();

app.use(cors());

app.use(express.json());

const registers = [];

//log das requisições
function logRequest(request, response, next){
    const { method, url } = request; //pega o metodo e a url
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel); //imprime

	return next(); //continua a executar o proximo middleware
}

//middleware
app.use(logRequest);

//List
app.get('/registers', (req, res) =>{
    return res.json(registers);
})

//Create
app.post('/registers', (req, res) => {
    const { data, currentKm, liters, priceLiter, totalValue, gasInfo } = req.body;
    console.log(req.body);
    const register = { id: uuid(), data, currentKm, liters, priceLiter, totalValue, gasInfo };
    registers.push(register);
    return res.json(register);
});

//Update
app.put('/registers/:id', (req, res) =>{
    const { id } = req.params;
    const { data, currentKm, liters, priceLiter, totalValue, gasInfo } = req.body;
    const registerIndex = registers.findIndex(register => register.id == id); //encontra posição do id passado
    if(registerIndex < 0){
        return res.status(400).json({ error: 'Register not found' });
    }
    const register = {
        id, 
        data, 
        currentKm,
        liters, 
        priceLiter,
        totalValue,
        gasInfo
    };
    registers[registerIndex] = register;
    return res.json(register);
});

//Delete
app.delete('/registers/:id', (req, res) => {
    const { id } = req.params;
    const registerIndex = registers.findIndex(register => register.id == id);
    if (registerIndex < 0){
        return res.status(400).json({ error:'Register not found' });
    }
    registers.splice(registerIndex,1); //remove posição 
    return res.status(204).send();    
})

app.listen(3000, () => {
    console.log('FuelControl backend is running!');
});