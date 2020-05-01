class Logger {
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
