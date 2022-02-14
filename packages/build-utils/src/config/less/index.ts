import {safeLess} from './safeLess.js';

type Less = typeof less;

class SafeLess {
    install(less: Less, pluginManager: Less.PluginManager) {
        pluginManager.addPreProcessor({process: safeLess}, 999);
    }
}

export interface LessConfigOptions {
    variables: Record<string, string>;
}

export default async ({variables}: LessConfigOptions) => {
    const importing = [import('less-plugin-npm-import'), import('less-plugin-functions')] as const;
    const [{default: NpmImport}, {default: LessPluginFunctions}] = await Promise.all(importing);
    return {
        math: 'always',
        javascriptEnabled: true,
        modifyVars: variables,
        plugins: [
            new SafeLess(),
            new NpmImport({prefix: '~'}),
            new LessPluginFunctions({alwaysOverride: true}),
        ],
        compress: false,
    };
};
