import fs from 'fs';
import stream from 'stream';

interface IBuildImage {
  image: string;
  basePath: string;
  file: fs.ReadStream;
}

interface ICreateContainer {
  image: string;
  startCommand: string[];
  workingDir: string;
  volumes: Record<string, {}>;
  host: {
    autoRemove: boolean;
  };
  tty: boolean;
}

interface IStartContainer {
  name: string;
}

interface IConnectToContainer {
  name: string;
  stream: stream.Writable;
}

export default interface IEngineProvider {
  buildImage(data: IBuildImage): Promise<void>;
  createContainer(data: ICreateContainer): Promise<string>;
  startContainer(data: IStartContainer): Promise<void>;
  connectToContainer(data: IConnectToContainer): Promise<void>;
  removeAllUnsedImages(): Promise<void>;
}
