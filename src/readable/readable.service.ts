import fs from 'fs';
import { Transform } from 'stream';
import tar from 'tar';
import handlebars from 'handlebars';
import GitRepository from './git.repository';
import {
  dockerfileSourcePath,
  dockerfileDestinationPath,
  projectDestination,
} from '../utils/pathResolver';

export default class ReadableService {
  async download(origin: string, image: string, folder: string): Promise<void> {
    const git = new GitRepository();
    await git.download(origin, projectDestination(folder));
    fs.createReadStream(dockerfileSourcePath(image))
      .pipe(
        new Transform({
          transform(chunk, encoding, callback): void {
            const template = handlebars.compile(chunk.toString());
            this.push(template({ foldername: projectDestination(folder) }));
            callback();
          },
        })
      )
      .pipe(fs.createWriteStream(dockerfileDestinationPath(folder)))
      .on('finish', () => {
        tar
          .c(
            {
              gzip: true,
            },
            [projectDestination(folder)]
          )
          .pipe(fs.createWriteStream(`${projectDestination(folder)}.gz`));
      });
  }
}
