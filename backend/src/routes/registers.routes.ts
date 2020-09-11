import { Router } from 'express';
import { format, parseISO } from 'date-fns';

import RegistersRepository from '../repositories/RegistersRepository';
import CreateRegisterService from '../services/CreateRegisterService';

const registersRouter = Router();
const registersRepository = new RegistersRepository();

registersRouter.get('/',(req, res) => {
    const registers = registersRepository.all();
    return res.json(registers);
});

registersRouter.post('/', (req, res) => {
    try{
        const { date, currentKm, fuel, liters, priceLiter, totalValue, gasInfo } = req.body;

        //transformou o date em uma string
        const parsedDate = format(parseISO(date), 'dd/MM/yyyy');

        const createRegisterService = new CreateRegisterService(registersRepository);

        const register = createRegisterService.execute({ date: parsedDate, currentKm, fuel, liters, priceLiter, totalValue, gasInfo });

        return res.json(register);
    }
    catch(err){
        return res.status(400).json({error: err.message});
    }
    
});

export default registersRouter;