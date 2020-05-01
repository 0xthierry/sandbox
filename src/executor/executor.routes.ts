import { Router, Request, Response } from 'express';
import ExecutorController from './executor.controller';
import ExecutorService from './executor.service';

import DockerRepository from '../docker/docker.repository';
import DockerService from '../docker/docker.service';

import ReadableService from '../readable/readable.service';

import Logger from '../logger';

const routes: Router = Router();
const logger = new Logger();
const dockerRepository = new DockerRepository();
const dockerService = new DockerService(dockerRepository);
const readableService = new ReadableService();
const executorService = new ExecutorService(
  dockerService,
  readableService,
  logger
);
const executorController = new ExecutorController(executorService, logger);

routes.post('/executor', (request: Request, response: Response) =>
  executorController.start(request, response)
);

export default routes;
