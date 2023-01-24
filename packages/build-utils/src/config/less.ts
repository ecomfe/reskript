import fs from 'node:fs/promises';
import {globby} from 'globby';
import {pMap} from '@reskript/core';
import less from 'less';

type Less = typeof less;

class LessInjection {
    private readonly injection: string = '';

    constructor(injection: string) {
        this.injection = injection;
    }

    install(less: Less, pluginManager: Less.PluginManager) {
        pluginManager.addPreProcessor({process: code => code + '\n\n\n' + this.injection}, 998);
    }
}

const resolveInjection = async (cwd: string, src: string, resources: string[]) => {
    const resolvedResources = await globby([...resources, `${src}/styles/*.var.less`], {cwd, absolute: true});
    const injections = await pMap(resolvedResources, v => fs.readFile(v, 'utf-8'));
    return injections.join('\n\n');
};

export interface LessConfigOptions {
    cwd: string;
    srcDirectory: string;
    variables: Record<string, string>;
    resources: string[];
}

export default async ({cwd, srcDirectory, variables, resources}: LessConfigOptions) => {
    const resolving = [import('less-plugin-npm-import'), resolveInjection(cwd, srcDirectory, resources)] as const;
    const [{default: NpmImport}, injection] = await Promise.all(resolving);

    return {
        math: 'always',
        javascriptEnabled: true,
        modifyVars: variables,
        plugins: [
            new LessInjection(injection),
            new NpmImport({prefix: '~'}),
        ],
        compress: false,
    };
};
