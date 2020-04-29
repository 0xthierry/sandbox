export interface IReadableRepository {
  download(path: string, dst: string): Promise<void>;
}
