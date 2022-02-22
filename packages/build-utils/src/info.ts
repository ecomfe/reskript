import path from 'node:path';
import {existsSync} from 'node:fs';
import childProcess from 'node:child_process';
import {promisify} from 'node:util';
import {logger} from '@reskript/core';
import {BuildEnv, ProjectSettings, RuntimeBuildEnv} from '@reskript/settings';

const exec = promisify(childProcess.exec);

const revision = async (): Promise<string> => {
    try {
        const output = await exec('git rev-parse --short HEAD');
        return output.stdout.toString().trim();
    }
    catch (ex) {
        logger.log('Not a git repository, fallback to default revision');
        return '0000000';
    }
};

export const createRuntimeBuildEnv = async <S extends ProjectSettings>(env: BuildEnv<S>) => {
    const now = new Date();
    const buildVersion = await revision();

    const runtimeEnv: RuntimeBuildEnv<S> = {
        ...env,
        buildVersion,
        buildTime: now.toISOString(),
    };
    return runtimeEnv;
};

interface ProjectLocation {
    cwd: string;
    srcDirectory: string;
}

export const hasServiceWorker = ({cwd, srcDirectory}: ProjectLocation) => {
    const serviceWorkerSource = path.join(cwd, srcDirectory, 'service-worker.js');
    return existsSync(serviceWorkerSource);
};
