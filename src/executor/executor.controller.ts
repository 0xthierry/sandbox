import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import path from 'path';
import ReadableService from '../readable/readable.service';
import { IExecutorStartRequest } from './interfaces';
import DockerService from '../docker/docker.service';
import DockerRepository from '../docker/docker.repository';

export default class ExecutorController {
  async start(request: Request, response: Response): Promise<void> {
    try {
      const startRequest: IExecutorStartRequest = request.body;
      const id = uuid();
      response.status(201).json({ job: id });

      const readableService = new ReadableService();
      await readableService.download(
        startRequest.origin,
        startRequest.image,
        id
      );
      //   const dockerRepository = new DockerRepository();
      //   const dockerService = new DockerService(dockerRepository);
      //   const containerId = await dockerService.createContainer({
      //     Image: startRequest.image,
      //     Cmd: startRequest.startCommand.split(' '),
      //     WorkingDir: '/usr/src/app',
      //     Volumes: {
      //       '/usr/src/app': {},
      //     },
      //     HostConfig: {
      //       AutoRemove: true,
      //     },
      //   });
      //   await dockerService.startContainer(containerId);
    } catch (error) {
      console.error(error);
    }
  }
}
