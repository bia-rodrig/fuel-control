import { Router } from 'express';
import { getRepository } from 'typeorm';
import { format, parseISO } from 'date-fns';

import CreateRegisterService from '../services/CreateRegisterService';
import Register from '../models/Register';

const registersRouter = Router();

registersRouter.get('/',async (req, res) => {
    const registersRepository = getRepository(Register);

    const registers = await registersRepository.find();

    return res.json(registers);
});

registersRouter.post('/', async (req, res) => {
    try{
        const {carPlate, date, currentKm, fuel, liters, priceLiter, totalValue, gasInfo } = req.body;

        //transformou o date em uma string
        const parsedDate = format(parseISO(date), 'dd/MM/yyyy');

        const createRegisterService = new CreateRegisterService();

        const register = await createRegisterService.execute({ carPlate, date: parsedDate, currentKm, fuel, liters, priceLiter, totalValue, gasInfo });

        return res.json(register);
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
    
});

export default registersRouter;