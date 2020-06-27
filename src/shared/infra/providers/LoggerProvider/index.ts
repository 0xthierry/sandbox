import { container } from 'tsyringe';
import ILoggerProvider from '@shared/providers/LoggerProvider/ILoggerProvider';
import LocalLoggerProvider from './LocalLoggerProvider';

container.registerSingleton<ILoggerProvider>(
  'LoggerProvider',
  LocalLoggerProvider,
);
