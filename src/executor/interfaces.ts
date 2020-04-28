export interface IExecutorStartRequest {
  source: 'git' | 's3';
  path: string;
}
