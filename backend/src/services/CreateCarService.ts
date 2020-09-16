import { getRepository } from 'typeorm';
import Car from '../models/Car';

interface Request{
    plate: string;
    model: string;
    brand: string;
}

class CreateCarService{
    public async execute ({ plate, model, brand }: Request): Promise<Car>{
        const carsRepository = getRepository(Car);
        const checkCarExists = await carsRepository.findOne({ where: { plate }});

        if (checkCarExists){
            throw new Error('Plate car already used');
        }

        const car = carsRepository.create({
            plate, model, brand
        });

        await carsRepository.save(car);

        return car;
    }
}

export default CreateCarService;