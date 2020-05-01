import { readableRepository } from '../readable/mapper';

export interface IExecutorStartRequest {
  source: readableRepository;
  origin: string;
  startCommand: string;
  image: 'node:12';
}
