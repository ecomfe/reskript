import path from 'path';
import fs from 'fs';
import {execSync} from 'child_process';
import {logger} from '@reskript/core';
import {BuildContext} from '../interface';

export const revision = (): string => {
    try {
        return execSync('git rev-parse --short HEAD', {stdio: 'pipe'}).toString().trim();
    }
    catch (ex) {
        logger.log('Not a git repository, fallback to default revision');
        return '0000000';
    }
};

export const hasServiceWorker = (context: BuildContext) => {
    const serviceWorkerSource = path.join(context.cwd, context.srcDirectory, 'service-worker.js');
    return fs.existsSync(serviceWorkerSource);
};
