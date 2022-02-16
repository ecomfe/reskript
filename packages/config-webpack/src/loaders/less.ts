import {resolve} from '@reskript/core';
import {lessConfig} from '@reskript/build-utils';
import less from 'less';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async ({cwd, projectSettings}) => {
    const {build: {style: {lessVariables, extract, resources}}} = projectSettings;
    const resolving = [resolve('less-loader'), lessConfig({cwd, resources, variables: lessVariables})] as const;
    const [loader, options] = await Promise.all(resolving);

    return {
        loader,
        options: {
            implementation: less,
            sourceMap: extract,
            lessOptions: options,
        },
    };
};

export default factory;
