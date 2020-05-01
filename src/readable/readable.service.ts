import fs from 'fs';
import tar from 'tar';
import rimraf from 'rimraf';
import handlebars from 'handlebars';
import {
  dockerfileSourcePath,
  dockerfileDestinationPath,
  projectDestination,
} from '../utils/pathResolver';
import MapperReadable, { readableRepository } from './mapper';

export default class ReadableService {
  async download(
    source: readableRepository,
    origin: string,
    image: string,
    folder: string
  ): Promise<fs.ReadStream> {
    const readable = MapperReadable.mapper(source);
    await readable.download(origin, projectDestination(folder));
    const dockerfileTemplate = fs.readFileSync(dockerfileSourcePath(image));
    const template = handlebars.compile(dockerfileTemplate.toString());
    fs.writeFileSync(
      dockerfileDestinationPath(folder),
      template({ foldername: projectDestination(folder) })
    );
    await tar.c(
      {
        gzip: true,
        file: `${projectDestination(folder)}.tar.gz`,
        preservePaths: true,
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
