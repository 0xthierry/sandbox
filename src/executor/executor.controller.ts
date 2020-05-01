/* eslint-disable no-console */
import { Request, Response } from 'express';
import uuid from 'uuid/v4';
import ReadableService from '../readable/readable.service';
import { IExecutorStartRequest } from './interfaces';
import DockerService from '../docker/docker.service';
import DockerRepository from '../docker/docker.repository';
import { dockerfileDestinationPath } from '../utils/pathResolver';
import logger from '../logger';

export default class ExecutorController {
  async start(request: Request, response: Response): Promise<void> {
    console.time('process time');
    try {
      const startRequest: IExecutorStartRequest = request.body;
      const id = uuid();
      logger.info('request recived', { id });
      response.status(201).json({ job: id });

      const readableService = new ReadableService();
      logger.info(`download start`, {
        origin: startRequest.origin,
        image: startRequest.image,
        id,
      });
      const result = await readableService.download(
        startRequest.origin,
        startRequest.image,
        id
      );
      logger.info(`download finished`, {
        origin: startRequest.origin,
        image: startRequest.image,
        id,
      });
      const dockerRepository = new DockerRepository();
      const dockerService = new DockerService(dockerRepository);
      logger.info(`image build start`, {
        dockerContext: dockerfileDestinationPath(id),
      });
      await dockerService.buildImage(id, dockerfileDestinationPath(id), result);
      logger.info(`image build success`, {
        dockerContext: dockerfileDestinationPath(id),
        imageName: id,
      });
      const dockerCreateParams = {
        Image: id,
        Cmd: startRequest.startCommand.split(' '),
        WorkingDir: '/usr/src/app',
        Volumes: {
          '/usr/src/app': {},
        },
        HostConfig: {
          AutoRemove: true,
        },
      };
      logger.info(`create container start`, {
        params: { ...dockerCreateParams },
      });
      const containerId = await dockerService.createContainer(
        dockerCreateParams
      );
      logger.info(`create container success`, {
        containerId,
      });
      logger.info(`star container`, {
        containerId,
      });
      await dockerService.startContainer(containerId);
      logger.info(`star container success`, {
        containerId,
      });
      logger.info(`star clear fs`, {
        id,
      });
      readableService.clear(id);
      logger.info(`clear fs success`, {
        id,
      });
      logger.info(`prune images`);
      await dockerService.pruneImage();
      logger.info(`prune images success`);
    } catch (error) {
      logger.error('executor start', error);
    }
    console.timeEnd('process time');
  }
}
