import config from './config';
import app from './app';

app().listen(config.api.port);
