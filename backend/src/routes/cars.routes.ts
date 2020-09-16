import { Router } from 'express';
import { CreateDateColumn } from 'typeorm';
import CreateCarService from '../services/CreateCarService';

const carsRouter = Router();

carsRouter.post('/', async (req, res) =>{
    try{

        const { plate, model, brand } = req.body;

        const createCar = new CreateCarService();

        const car = await createCar.execute({ plate, model, brand });

        return res.json(car);
    }
    catch (err){
        return res.status(400).json({ error: err.message });
    }
});

export default carsRouter;