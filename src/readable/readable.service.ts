import GitRepository from './git.repository';

export default class ReadableService {
  async download(path: string, dst: string): Promise<void> {
    const git = new GitRepository();
    return git.download(path, dst);
  }
}
