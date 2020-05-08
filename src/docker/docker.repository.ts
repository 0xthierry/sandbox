import fs from 'fs';
import stream from 'stream';
import { IDockerRepository, IContainer, IContainerConfig } from './interfaces';
import axios from '../utils/axios';

// implements IDockerRepository
export default class DockerRepository implements IDockerRepository {
  async createContainer(data: Partial<IContainerConfig>): Promise<string> {
    const response = await axios.post(`/containers/create`, { ...data });
    return response.data.Id;
  }

  async getOneContainer(id: string): Promise<IContainer> {
    const { data } = await axios.get(`/containers/${id}/json`);
    return data;
  }

  async deleteContainer(
    id: string,
    removeVolumes = false,
    force = false,
    link = false
  ): Promise<void> {
    await axios.delete(`/containers/${id}`, {
      params: {
        v: removeVolumes,
        force,
        link,
      },
    });
  }

  async startContainer(id: string): Promise<void> {
    await axios.post(`/containers/${id}/start`);
  }

  async attachContainer(id: string, writable: stream.Writable): Promise<void> {
    const response = await axios({
      url: `/containers/${id}/attach`,
      method: 'POST',
      params: {
        stream: true,
        stdout: true,
      },
      responseType: 'stream',
    });
    response.data.pipe(writable);
  }

  async buildImage(
    name: string,
    dockerfileContext: string,
    file: fs.ReadStream
  ): Promise<void> {
    await axios({
      method: 'POST',
      url: '/build',
      data: file,
      params: {
        dockerfile: dockerfileContext,
        t: name,
      },
      headers: {
        'Content-type': 'application/x-tar"',
      },
    });
  }

  async pruneImage(): Promise<void> {
    await axios.post(`/images/prune`);
  }
}
