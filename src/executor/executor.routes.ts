import { Router } from 'express';
import ExecutorController from './executor.controller';

const routes: Router = Router();
const executorController = new ExecutorController();

routes.post('/executor', executorController.start);

export default routes;
