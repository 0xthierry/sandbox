/* eslint-disable no-console */
import ILoggerProvider from '@shared/providers/LoggerProvider/ILoggerProvider';

export default class LocalLoggerProvider implements ILoggerProvider {
  error(error: Error): void {
    console.error(`error: ${error.message}, name: ${error.name}`);
  }

  info(message: string): void {
    console.info(`info: ${message}`);
  }

  warn(message: string): void {
    console.warn(`warn: ${message}`);
  }
}
