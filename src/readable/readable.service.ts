import fs from 'fs';
import fsExtra from 'fs-extra';
import tar from 'tar';
import handlebars from 'handlebars';
import {
  dockerfileSourcePath,
  dockerfileDestinationPath,
  fileDestinationPath,
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
    const [dockerignore, dockerfile, npmrc] = await Promise.all([
      fs.promises.readFile(dockerfileSourcePath(image, '.dockerignore')),
      fs.promises.readFile(dockerfileSourcePath(image, 'dockerfile.hbs')),
      fs.promises.readFile(dockerfileSourcePath(image, '.npmrc')),
    ]);
    const dockerfileTemplate = handlebars.compile(dockerfile.toString());
    await Promise.all([
      fs.promises.writeFile(
        dockerfileDestinationPath(folder),
        dockerfileTemplate({ foldername: projectDestination(folder) })
      ),
      fs.promises.writeFile(
        fileDestinationPath(folder, '.dockerignore'),
        dockerignore.toString()
      ),
      fs.promises.writeFile(fileDestinationPath(folder, '.npmrc'), npmrc),
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
