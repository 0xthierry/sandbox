/* eslint-disable indent */
import GitRepository from './git.repository';
import { IReadableRepository } from './interfaces';

export type readableRepository = 'git';
export default class MapperRepository {
  static mapper(type: readableRepository): IReadableRepository {
    switch (type) {
      case 'git':
        return new GitRepository();
      default:
        throw new Error('Invalid readable origin');
    }
  }
}
