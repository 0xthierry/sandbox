/* eslint-disable import/prefer-default-export */
import path from 'path';

export function dockerfileSourcePath(folder: string, file: string): string {
  return path.resolve(__dirname, '..', '..', 'dockerfiles', folder, file);
}

export function dockerfileDestinationPath(folder: string): string {
  return path.resolve(__dirname, '..', '..', '..', 'tmp', folder, 'Dockerfile');
}
export function dockerfileIgnoreDestinationPath(folder: string): string {
  return path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    folder,
    '.dockerignore'
  );
}
export function projectDestination(folder: string): string {
  return path.resolve(__dirname, '..', '..', '..', 'tmp', folder);
}
export function containerOuput(name: string): string {
  return `${path.resolve(__dirname, '..', '..', '..', 'tmp', name)}.json`;
}
