/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';

dotenv.config();

export interface IAppConfig {
  api: {
    port: number;
  };
  docker: {
    url: string;
  };
}

const PORT = process.env.PORT || '3001';

const config: IAppConfig = {
  api: {
    port: parseInt(PORT, 10),
  },
  docker: {
    url: process.env.DOCKER_API || '',
  },
};

export default config;
