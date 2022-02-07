import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

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
            sourceMap: extract,
            lessOptions: {
                math: 'always',
                javascriptEnabled: true,
                modifyVars: lessVariables,
                plugins: [
                    new NpmImport({prefix: '~'}),
                    new LessPluginFunctions({alwaysOverride: true}),
                ],
                compress: false,
            },
        },
    };
};

export default factory;
