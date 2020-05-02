import fs from 'fs';
import stream from 'stream';

export interface IContainerHostConfig {
  CpuShares: number;
  Memory: number;
  AutoRemove: boolean;
  Mounts: {
    Target: string;
    Source: string;
    Type: 'bind' | 'volume' | 'tmpfs' | 'npipe';
    ReadOnly: boolean;
  }[];
}

export interface IContainerConfig {
  ExposedPorts: Record<string, {}>;
  Tty: false;
  OpenStdin: false;
  StdinOnce: false;
  Env: string[];
  Cmd: string[];
  Image: string;
  Volumes: Record<string, {}>;
  WorkingDir: string;
  Entrypoint: string | string[];
  HostConfig: Partial<IContainerHostConfig>;
}

export interface IContainer {
  Id: string;
  Created: string;
  State: {
    Status: string;
    Running: boolean;
    Paused: false;
    StartedAt: string;
    FinishedAt: string;
  };
  Name: string;
  config: Partial<IContainerConfig>;
}

export interface IDockerRepository {
  getOneContainer: (id: string) => Promise<IContainer>;
  createContainer: (data: Partial<IContainerConfig>) => Promise<string>;
  deleteContainer: (
    id: string,
    removeVolumes?: boolean,
    force?: boolean,
    link?: boolean
  ) => Promise<void>;
  startContainer: (id: string) => Promise<void>;
  buildImage: (
    name: string,
    dockerfileContext: string,
    file: fs.ReadStream
  ) => Promise<void>;
  pruneImage: () => Promise<void>;
  attachContainer: (id: string, writable: stream.Writable) => Promise<void>;
}
