import {resolve} from '@reskript/core';
import less from 'less';
import {LoaderFactory} from '../interface.js';
import {safeLess} from '../utils/safeLess.js';

type Less = typeof less;

class SafeLess {
    install(less: Less, pluginManager: Less.PluginManager) {
        pluginManager.addPreProcessor({process: safeLess}, 999);
    }
}

const factory: LoaderFactory = async ({projectSettings}) => {
    const importing = [
        resolve('less-loader'),
        import('less-plugin-npm-import'),
        import('less-plugin-functions'),
    ] as const;
    const [loader, {default: NpmImport}, {default: LessPluginFunctions}] = await Promise.all(importing);
    const {build: {style: {lessVariables, extract}}} = projectSettings;

    return {
        loader,
        options: {
            implementation: less,
            sourceMap: extract,
            lessOptions: {
                math: 'always',
                javascriptEnabled: true,
                modifyVars: lessVariables,
                plugins: [
                    new SafeLess(),
                    new NpmImport({prefix: '~'}),
                    new LessPluginFunctions({alwaysOverride: true}),
                ],
                compress: false,
            },
        },
    };
};

export default factory;
