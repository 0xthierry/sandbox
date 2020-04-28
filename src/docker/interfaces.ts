export interface IContainerHostConfig {
  CpuShares: number;
  Memory: number;
  AutoRemove: boolean;
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
  HostConfig: IContainerHostConfig;
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
  config: IContainerConfig;
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
}
