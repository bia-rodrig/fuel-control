import Register from '../models/Register';
import RegistersRepository from '../repositories/RegistersRepository';

interface Request{
    date: string;
    currentKm:number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;
}

class CreateRepositoryService{
    private registersRepository: RegistersRepository;

    constructor (registersRepository: RegistersRepository){
        this.registersRepository = registersRepository
    }

    public execute({date, currentKm, fuel, liters,priceLiter, totalValue, gasInfo}: Request): Register{
        
        //Se houver alguma validação de dados a ser feita, será inserida aqui
        
        const register = this.registersRepository.create({
            date, 
            currentKm, 
            fuel, 
            liters,
            priceLiter, 
            totalValue, 
            gasInfo});

            return register;
    }
}

export default CreateRepositoryService;