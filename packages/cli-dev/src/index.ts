import {watchProjectSettings, DevCommandLineArgs, readProjectSettings, ProjectSettings} from '@reskript/settings';
import {prepareEnvironment} from '@reskript/core';
import {AppEntry, EntryLocation} from '@reskript/build-utils';
import {createBuildContext, prepareServerContext, restartable, ServerStartContext} from './utils.js';

process.env.OPEN_MATCH_HOST_ONLY = 'true';

type CollectEntry<C> = (location: EntryLocation) => Promise<Array<AppEntry<C>>>;

type ServerStart<C, S extends ProjectSettings> = (
    cmd: DevCommandLineArgs,
    context: ServerStartContext<C, S>
) => Promise<() => Promise<void>>;

interface CreateStartOptions<C, S extends ProjectSettings> {
    collectEntries: CollectEntry<C>;
    projectSettings: S;
    start: ServerStart<C, S>;
}

const createStart = async (cmd: DevCommandLineArgs, projectSettings: ProjectSettings) => {
    const entryLocation: EntryLocation = {
        cwd: cmd.cwd,
        srcDirectory: cmd.srcDirectory,
        entryDirectory: cmd.entriesDirectory,
        only: [cmd.entry],
    };

    const create = async <C, S extends ProjectSettings>(options: CreateStartOptions<C, S>) => {
        const {collectEntries, projectSettings, start} = options;
        const entries = await collectEntries(entryLocation);
        const buildContext = await createBuildContext({cmd, projectSettings, entries});
        const serverContext = await prepareServerContext({cmd, buildContext});
        return () => start(cmd, serverContext);
    };

    if (projectSettings.driver === 'webpack') {
        const importing = [import('@reskript/config-webpack'), import('./webpack.js')] as const;
        const [{collectEntries}, {start}] = await Promise.all(importing);
        return create({collectEntries, projectSettings, start});
    }
    else {
        const importing = [import('@reskript/config-vite'), import('./vite.js')] as const;
        const [{collectEntries}, {start}] = await Promise.all(importing);
        return create({collectEntries, projectSettings, start});
    }
};

export const run = async (cmd: DevCommandLineArgs): Promise<void> => {
    process.env.NODE_ENV = cmd.mode;
    await prepareEnvironment(cmd.cwd, cmd.mode, cmd.envFiles);

    const projectSettings = await readProjectSettings({commandName: 'dev', specifiedFile: cmd.configFile, ...cmd});
    const start = await createStart(cmd, projectSettings);
    const restart = restartable(start);
    const listen = await watchProjectSettings({commandName: 'dev', specifiedFile: cmd.configFile, ...cmd});
    listen(restart);
};
