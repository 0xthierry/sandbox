import fs from 'fs';
import fsExtra from 'fs-extra';
import tar from 'tar';
import handlebars from 'handlebars';
import {
  dockerfileSourcePath,
  dockerfileDestinationPath,
  dockerfileIgnoreDestinationPath,
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
    const [dockerignore, dockerfile] = await Promise.all([
      fs.promises.readFile(dockerfileSourcePath(image, '.dockerignore')),
      fs.promises.readFile(dockerfileSourcePath(image, 'dockerfile.hbs')),
    ]);
    const dockerfileTemplate = handlebars.compile(dockerfile.toString());
    await Promise.all([
      fs.promises.writeFile(
        dockerfileDestinationPath(folder),
        dockerfileTemplate({ foldername: projectDestination(folder) })
      ),
      fs.promises.writeFile(
        dockerfileIgnoreDestinationPath(folder),
        dockerignore.toString()
      ),
    ]);
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

  async clear(folder: string): Promise<void> {
    await Promise.all([
      fsExtra.remove(projectDestination(folder)),
      fs.promises.unlink(`${projectDestination(folder)}.tar.gz`),
    ]);
  }
}
