import axios from 'axios';
import config from '../config/app';

const api = axios.create({ baseURL: config.docker.url });

export default api;
