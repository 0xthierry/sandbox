import express, { Application } from 'express';
import routes from './routes';

export default function (): Application {
  const app = express();
  /**
   * Middlewares
   */
  app.use(express.json());
  /**
   * Routes
   */
  app.use(routes);
  return app;
}
