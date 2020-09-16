import { getRepository } from 'typeorm'

import Register from '../models/Register';

interface Request{
    carPlate: string;
    date: string;
    currentKm:number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;
}

class CreateRepositoryService{


    public async execute({carPlate, date, currentKm, fuel, liters,priceLiter, totalValue, gasInfo}: Request): Promise<Register>{
        
        const registersRepository = getRepository(Register);

        const register = registersRepository.create({
            carPlate,
            date,
            currentKm,
            fuel,
            liters,
            priceLiter,
            totalValue,
            gasInfo
        });

        await registersRepository.save(register);

        return register;
    }
}

export default CreateRepositoryService;