import { IDockerRepository, IContainer, IContainerConfig } from './interfaces';

export default class DockerService {
  constructor(private dockerRepository: IDockerRepository) {}

  async createContainer(data: Partial<IContainerConfig>): Promise<string> {
    const containerId = await this.dockerRepository.createContainer(data);
    return containerId;
  }

  async getOneContainer(id: string): Promise<IContainer> {
    const container = await this.dockerRepository.getOneContainer(id);
    return container;
  }

  async deleteContainer(id: string): Promise<void> {
    await this.dockerRepository.deleteContainer(`/containers/${id}`);
  }

  async startContainer(id: string): Promise<void> {
    await this.dockerRepository.startContainer(id);
  }
}
