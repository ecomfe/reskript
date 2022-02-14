import {resolveFrom} from '@reskript/core';
import presetEnv from 'postcss-preset-env';
import nano from 'cssnano';

interface Options {
    cwd: string;
    tailwind: boolean;
    minify: boolean;
}

export default async ({cwd, tailwind, minify}: Options) => {
    const importTailwind = async () => {
        const resolve = resolveFrom(cwd);
        const location = await resolve('tailwindcss');
        const {default: tailwind} = await import(location);
        return tailwind;
    };
    const plugins = [
        tailwind && await importTailwind(),
        presetEnv(),
        minify && nano(),
    ];
    return {plugins};
};
