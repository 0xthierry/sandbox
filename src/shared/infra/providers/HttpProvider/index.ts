import { container } from 'tsyringe';
import appConfig from '@config/app';
import AxiosProvider from './AxiosProvider';

container.register('HttpProvider', {
  useValue: new AxiosProvider({ baseURL: appConfig.docker.url }),
});
