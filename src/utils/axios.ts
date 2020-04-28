import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5555/v1.40' });

export default api;
