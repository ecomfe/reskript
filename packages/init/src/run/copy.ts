import path from 'path';
import {promises as fs, existsSync} from 'fs';
import ora from 'ora';
import globby from 'globby';
import {UserOptions} from '../interface';


export default async (cwd: string, options: UserOptions) => {
    const spinner = ora('Copying initial files');
    spinner.start();

    const templateDirectory = path.join(__dirname, '..', '..', 'templates', 'normal-app');
    const files = await globby(`${templateDirectory}/**`, {dot: true});
    const copyFile = async (file: string) => {
        const relative = path.relative(templateDirectory, file);
        const destination = path.join(cwd, relative);
        await fs.mkdir(path.dirname(destination), {recursive: true});
        const content = await fs.readFile(file, 'utf-8');
        await fs.writeFile(
            destination,
            content.replace(/\{\{(\w+)\}\}/g, (match, key) => (options as any)[key].toString())
        );
    };
    await Promise.all(files.map(copyFile));
    const gitignoreExists = existsSync(path.join(cwd, '.gitignore'));
    if (gitignoreExists) {
        // Append if there's already a `.gitignore` file there
        const data = await fs.readFile(path.join(cwd, 'gitignore'));
        await fs.appendFile(path.join(cwd, '.gitignore'), data);
        await fs.unlink(path.join(cwd, 'gitignore'));
    } else {
        // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
        await fs.rename(
            path.join(cwd, 'gitignore'),
            path.join(cwd, '.gitignore')
        );
    }
    spinner.succeed();
};
