import {lessConfig, postcssConfig} from '@reskript/build-utils';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async context => {
    const settings = context.projectSettings;
    const lessOptions = {
        cwd: context.cwd,
        variables: settings.build.style.lessVariables,
        resources: settings.build.style.resources,
    };
    const postcssOptions = {
        cwd: context.cwd,
        tailwind: settings.build.uses.includes('tailwind'),
        minify: context.mode === 'production',
    };

    return {
        build: {
            cssCodeSplit: true,
        },
        css: {
            preprocessorOptions: {
                less: await lessConfig(lessOptions),
            },
            postcss: await postcssConfig(postcssOptions),
        },
    };
};

export default factory;
