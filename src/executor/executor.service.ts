import fs from 'fs';
import stream from 'stream';
import DockerService from '../docker/docker.service';
import ReadableService from '../readable/readable.service';
import Logger from '../logger';
import { IExecutorStartRequest } from './interfaces';
import {
  dockerfileDestinationPath,
  containerOuput,
} from '../utils/pathResolver';

export default class ExecutorService {
  constructor(
    private dockerService: DockerService,
    private readableService: ReadableService,
    private logger: Logger
  ) {}

  async start(startRequest: IExecutorStartRequest, id: string): Promise<void> {
    this.logger.info(`download start`, {
      origin: startRequest.origin,
      image: startRequest.image,
      id,
    });
    const result = await this.readableService.download(
      startRequest.source,
      startRequest.origin,
      startRequest.image,
      id
    );
    this.logger.info(`download finished`, {
      origin: startRequest.origin,
      image: startRequest.image,
      id,
    });
    this.logger.info(`image build start`, {
      dockerContext: dockerfileDestinationPath(id),
    });
    await this.dockerService.buildImage(
      id,
      dockerfileDestinationPath(id),
      result
    );
    this.logger.info(`image build success`, {
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
      Tty: true,
    };
    this.logger.info(`create container start`, {
      params: { ...dockerCreateParams },
    });
    const containerId = await this.dockerService.createContainer(
      dockerCreateParams
    );
    this.logger.info(`create container success`, {
      containerId,
    });
    this.logger.info(`star container`, {
      containerId,
    });
    await this.dockerService.startContainer(containerId);
    this.logger.info(`star container success`, {
      containerId,
    });
    await this.dockerService.attachContainer(
      containerId,
      fs.createWriteStream(containerOuput(id))
    );
    this.logger.info(`star clear fs`, {
      id,
    });
    await this.readableService.clear(id);
    this.logger.info(`clear fs success`, {
      id,
    });
    this.logger.info(`prune images`);
    await this.dockerService.pruneImage();
    this.logger.info(`prune images success`);
  }
}
