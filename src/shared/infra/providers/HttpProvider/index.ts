import { container } from 'tsyringe';
import appConfig from '@config/app';
import IHttpProvider from '@shared/providers/HttpProvider/IHttpProvider';
import AxiosProvider from './AxiosProvider';

container.register<IHttpProvider>('HttpProvider', {
  useValue: new AxiosProvider({ baseURL: appConfig.docker.url }),
});
