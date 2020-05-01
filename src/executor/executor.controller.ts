/* eslint-disable no-console */
import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import { IExecutorStartRequest } from './interfaces';
import Logger from '../logger';
import ExecutorService from './executor.service';

export default class ExecutorController {
  constructor(
    private executorService: ExecutorService,
    private logger: Logger
  ) {}

  async start(request: Request, response: Response): Promise<void> {
    console.time('process time');
    try {
      const startRequest: IExecutorStartRequest = request.body;
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
