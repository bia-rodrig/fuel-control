import {uuid} from 'uuidv4';

class Register{
    id: string;
    date: string;
    currentKm: number;
    fuel: string;
    liters: number;
    priceLiter: number;
    totalValue: number;
    gasInfo: string;

    constructor(date: string, currentKm: number, fuel: string,
                liters: number, priceLiter: number, totalValue: number, gasINfo: string){
        this.id = uuid();
        this.date = date;
        this.currentKm = currentKm;
        this.fuel = fuel;
        this.liters = liters;
        this.priceLiter = priceLiter;
        this.totalValue = totalValue;
        this.gasInfo = gasINfo;
    }

}

export default Register;