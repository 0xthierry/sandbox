import fs from 'fs';
import tar from 'tar';
import path from 'path';
import handlebars from 'handlebars';
import GitRepository from './git.repository';

export default class ReadableService {
  async download(origin: string, image: string, folder: string): Promise<void> {
    const git = new GitRepository();
    const dst = path.resolve(__dirname, '..', '..', '..', 'tmp', folder);
    const dockerfileDst = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      folder,
      'Dockerfile'
    );

    await git.download(origin, dst);
    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        '..',
        '..',
        'dockerfiles',
        image,
        'dockerfile.hbs'
      )
    );
    const template = handlebars.compile(source.toString());
    fs.writeFileSync(dockerfileDst, template({ foldername: folder }));
    // tar.c({
    //   gzip: true,
    //   file: `${folder}.tgz`,
    // });
  }
}
