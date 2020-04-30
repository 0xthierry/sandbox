import fs from 'fs';
import tar from 'tar';
import rimraf from 'rimraf';
import handlebars from 'handlebars';
import GitRepository from './git.repository';
import {
  dockerfileSourcePath,
  dockerfileDestinationPath,
  projectDestination,
} from '../utils/pathResolver';

export default class ReadableService {
  async download(
    origin: string,
    image: string,
    folder: string
  ): Promise<fs.ReadStream> {
    const git = new GitRepository();
    await git.download(origin, projectDestination(folder));
    const dockerfileTemplate = fs.readFileSync(dockerfileSourcePath(image));
    const template = handlebars.compile(dockerfileTemplate.toString());
    fs.writeFileSync(
      dockerfileDestinationPath(folder),
      template({ foldername: folder })
    );
    await tar.c(
      {
        gzip: true,
        file: `${projectDestination(folder)}.tar.gz`,
        preservePaths: true,
        portable: true,
      },
      [projectDestination(folder)]
    );
    return fs.createReadStream(`${projectDestination(folder)}.tar.gz`);
  }

  clear(folder: string): void {
    rimraf.sync(projectDestination(folder));
    fs.unlinkSync(`${projectDestination(folder)}.tar.gz`);
  }
}
