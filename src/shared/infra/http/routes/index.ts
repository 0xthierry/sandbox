import { Router } from 'express';
import executorRoutes from '@modules/executor/infra/http/routes/executor.routes';

const routes = Router();

routes.use('executor', executorRoutes);

export default routes;
