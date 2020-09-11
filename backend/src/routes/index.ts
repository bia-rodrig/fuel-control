import { Router } from 'express';
import registersRoutes from './registers.routes';

const routes = Router();

routes.use('/registers', registersRoutes);

export default routes;