import {UserConfig} from 'vite';
import {lessConfig, postcssConfig} from '@reskript/build-utils';

interface Options {
    cwd: string;
    extract: boolean;
    variables: Record<string, string>;
    tailwind: boolean;
    minify: boolean;
}

export default async ({cwd, extract, variables, tailwind, minify}: Options): Promise<UserConfig> => {
    return {
        build: {
            cssCodeSplit: !extract,
        },
        css: {
            preprocessorOptions: {
                less: await lessConfig({variables}),
            },
            postcss: await postcssConfig({cwd, tailwind, minify}),
        },
    };
};
