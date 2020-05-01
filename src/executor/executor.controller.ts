/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import { IExecutorStartRequest } from './interfaces';
import Logger from '../logger';
import ExecutorService from './executor.service';
import { create as createSchema } from './executor.validation';

export default class ExecutorController {
  constructor(
    private executorService: ExecutorService,
    private logger: Logger
  ) {}

  async start(request: Request, response: Response): Promise<void | Response> {
    console.time('process time');
    try {
      const startRequest: IExecutorStartRequest = request.body;
      try {
        await createSchema.validate(startRequest);
      } catch (error) {
        return response.status(400).json({ error });
      }
      const id = uuid();
      this.logger.info('request recived', { ...startRequest });
      response.status(201).json({ job: id });
      this.logger.info('start executor service', { id });
      await this.executorService.start(startRequest, id);
      this.logger.info('start executor service success', { id });
    } catch (error) {
      this.logger.error('executor start', error);
    }
    console.timeEnd('process time');
  }
}
