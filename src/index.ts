import appConfig from './config/app';
import app from './app';

app().listen(appConfig.api.port);
