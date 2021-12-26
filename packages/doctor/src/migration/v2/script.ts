import path from 'path';
import fs from 'fs/promises';
import {warn} from '../logger.js';

const extractCommandCallScript = (lines: string[], command: string): string | false => {
    const line = lines.find(v => v.includes(`skr ${command}`));

    if (!line) {
        return false;
    }

    for (const [match] of line.matchAll(/"[^"+]"/g)) {
        if (match.includes(`skr ${command}`)) {
            return match.slice(1, -1);
        }
    }

    return false;
};

const isBrokenTestScript = (script: string) => {
    if (!script.includes('skr test')) {
        return false;
    }

    for (const [match] of script.matchAll(/--\S+/g)) {
        if (!match.startsWith('--target')) {
            return true;
        }
    }

    return false;
};

// eslint-disable-next-line complexity
export default async (cwd: string) => {
    const lines = (await fs.readFile(path.join(cwd, 'package.json'), 'utf-8')).split('\n');

    const testScript = extractCommandCallScript(lines, 'test');
    if (isBrokenTestScript(testScript || '')) {
        warn(
            'package.json contains unsupported args passing to skr test, put all args excluding --target after "--"',
            'see: https://reskript.vercel.app/docs/migration/v2#test'
        );
    }

    const buildScript = extractCommandCallScript(lines, 'build');
    if (buildScript && /--src[ =]/.test(buildScript)) {
        warn(
            'package.json is passing --src arg to skr build, rename it to --src-dir',
            'see: https://reskript.vercel.app/docs/migration/v2#build'
        );
    }

    const devScript = extractCommandCallScript(lines, 'dev');
    if (devScript && /--src[ =]/.test(devScript)) {
        warn(
            'package.json is passing --src arg to skr dev, rename it to --src-dir',
            'see: https://reskript.vercel.app/docs/migration/v2#dev'
        );
    }
    if (devScript && /--open[ =]/.test(devScript)) {
        warn(
            'package.json is passing --open arg to skr dev, change it to --host with different value',
            'see: https://reskript.vercel.app/docs/migration/v2#dev'
        );
    }

    const babelScript = extractCommandCallScript(lines, 'babel');
    if (babelScript && /--out[ =]/.test(babelScript)) {
        warn(
            'package.json is passing --out arg to skr babel, rename it to --out-dir',
            'see: https://reskript.vercel.app/docs/migration/v2#babel'
        );
    }
};
