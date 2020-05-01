import axios from 'axios';
import config from '../config';

const api = axios.create({ baseURL: config.docker.url });

export default api;
