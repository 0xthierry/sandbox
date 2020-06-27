export interface IStartExecutionServiceRequest {
  source: 'git';
  origin: string;
  startCommand: string;
  image: 'node:12';
  id: string;
}
