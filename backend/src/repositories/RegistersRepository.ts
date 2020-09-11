import Register from '../models/Register'

interface CreateRegisterDTO{
    date: string;
    currentKm:number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;

}

class RegisterRepository{
    private registers: Register[];

    constructor(){
        this.registers = [];
    }

    public all(): Register[]{

        return this.registers;
    }

    public create({date, currentKm, fuel, liters,priceLiter, totalValue, gasInfo} : CreateRegisterDTO){
            const register = new Register(date, currentKm, fuel, liters, priceLiter, totalValue, gasInfo);
            
            this.registers.push(register);

            return register;
    }
}

export default RegisterRepository;