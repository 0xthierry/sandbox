/* eslint-disable import/prefer-default-export */
import path from 'path';

export function dockerfileSourcePath(folder: string): string {
  return path.resolve(
    __dirname,
    '..',
    '..',
    'dockerfiles',
    folder,
    'dockerfile.hbs'
  );
}

export function dockerfileDestinationPath(folder: string): string {
  return path.resolve(__dirname, '..', '..', '..', 'tmp', folder, 'Dockerfile');
}

export function projectDestination(folder: string): string {
  return path.resolve(__dirname, '..', '..', '..', 'tmp', folder);
}
