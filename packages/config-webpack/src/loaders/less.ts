import {sync as resolve} from 'resolve';
import NpmImport from 'less-plugin-npm-import';
import LessPluginFunctions from 'less-plugin-functions';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = ({projectSettings}) => {
    const {build: {style: {lessVariables, extract}}} = projectSettings;

    return {
        loader: resolve('less-loader'),
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
