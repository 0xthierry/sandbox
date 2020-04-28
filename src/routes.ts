import { Router } from 'express';
import executorRoutes from './executor/executor.routes';

const routes: Router = Router();
routes.use(executorRoutes);
export default routes;
