export interface ILogger {
  info: (message: string, data?: object) => void;
  warn: (message: string, data?: object) => void;
  error: (message: string, data?: object) => void;
}

/* eslint-disable no-console */
class Logger implements ILogger {
  info(message: string, data?: object): void {
    console.error(`info: ${message} - data:${JSON.stringify(data || {})}`);
  }

  warn(message: string, data?: object): void {
    console.error(`warn: ${message} - data:${JSON.stringify(data || {})}`);
  }

  error(message: string, data?: object): void {
    console.error(`error: ${message} - data:${JSON.stringify(data || {})}`);
  }
}

export default new Logger();
