import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import StartExecutionService from '@modules/executor/services/StartExecutionService';

export default class ExecutorController {
  async create(request: Request, response: Response): Promise<Response> {
    const startExecutionService = container.resolve(StartExecutionService);

    const id = uuid();

    const { image, source, origin, startCommand } = request.body;

    startExecutionService.execute({ id, image, source, origin, startCommand });

    return response.status(201).json({ job: id });
  }
}
