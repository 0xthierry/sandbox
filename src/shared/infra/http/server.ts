import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errors } from 'celebrate';
import appConfig from '@config/app';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        status: 'error',
      });
    }

    return response.status(500).json({
      message: 'Internal server error',
      errorCode: 'INTERNAL_SERVER_ERROR',
      status: 'error',
    });
  },
);

app.listen(appConfig.api.port);
