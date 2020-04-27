/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';

dotenv.config();
export interface IAppConfig {
  api: {
    port: number;
  };
}

const PORT = process.env.PORT || '3001';
const config: IAppConfig = {
  api: {
    port: parseInt(PORT, 10),
  },
};
export default config;
