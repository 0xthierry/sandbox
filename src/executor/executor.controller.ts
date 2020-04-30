import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import ReadableService from '../readable/readable.service';
import { IExecutorStartRequest } from './interfaces';
import DockerService from '../docker/docker.service';
import DockerRepository from '../docker/docker.repository';
import { dockerfileDestinationPath } from '../utils/pathResolver';

export default class ExecutorController {
  async start(request: Request, response: Response): Promise<void> {
    try {
      const startRequest: IExecutorStartRequest = request.body;
      const id = uuid();
      response.status(201).json({ job: id });

      const readableService = new ReadableService();
      const result = await readableService.download(
        startRequest.origin,
        startRequest.image,
        id
      );
      const dockerRepository = new DockerRepository();
      await dockerRepository.buildImage(dockerfileDestinationPath(id), result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
