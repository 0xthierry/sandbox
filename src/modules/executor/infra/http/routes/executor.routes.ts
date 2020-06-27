import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ExecutorController from '../controllers/ExecutorController';

const routes = Router();
const executorController = new ExecutorController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      source: Joi.string().required(),
      origin: Joi.string().required(),
      startCommand: Joi.string().required(),
      image: Joi.string().required(),
    },
  }),
  executorController.create,
);

export default routes;
