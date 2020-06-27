export default interface ILoggerProvider {
  info(message: string): void;

  warn(message: string): void;

  error(error: Error): void;
}
