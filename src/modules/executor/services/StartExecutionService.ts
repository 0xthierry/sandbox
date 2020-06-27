import { IStartExecutionServiceRequest } from '@modules/executor/dtos/StartExecutionService';

export default class StartExecutionService {
  async execute(data: IStartExecutionServiceRequest): Promise<void> {}
}
