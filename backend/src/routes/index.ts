import { Router } from 'express';

import registersRoutes from './registers.routes';
import carsRoutes from './cars.routes';
import carsRouter from './cars.routes';

const routes = Router();

routes.use('/registers', registersRoutes);
routes.use('/cars', carsRouter);

export default routes;