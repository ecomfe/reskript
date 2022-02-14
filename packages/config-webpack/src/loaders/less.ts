import {resolve} from '@reskript/core';
import {lessConfig} from '@reskript/build-utils';
import less from 'less';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async ({projectSettings}) => {
    const {build: {style: {lessVariables, extract}}} = projectSettings;
    const [loader, options] = await Promise.all([resolve('less-loader'), lessConfig({variables: lessVariables})]);

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
