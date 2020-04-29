export interface IExecutorStartRequest {
  source: 'git' | 's3';
  path: string;
  startCommand: string;
  image: 'node:12';
}
