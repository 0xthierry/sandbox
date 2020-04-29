export interface IExecutorStartRequest {
  source: 'git' | 's3';
  origin: string;
  startCommand: string;
  image: 'node:12';
}
