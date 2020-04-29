import Git from 'nodegit';
import { IReadableRepository } from './interfaces';

export default class GitRepository implements IReadableRepository {
  async download(path: string, dst: string): Promise<void> {
    await Git.Clone.clone(path, dst);
  }
}
