import {build, BuildOptions} from 'esbuild';
// @ts-expect-error
import dedent from 'dedent';
import {dirFromImportMeta} from '@reskript/core';

const content = (appName: string, index: string) => dedent`
    import {registerMicroApps, start} from 'qiankun';

    const apps = [
        {
            name: '${appName}',
            entry: '${index}',
            container: '#apps',
            activeRule: '/',
        },
    ];
    registerMicroApps(apps);
    start();
`;

export default async (appName: string, index: string) => {
    const options: BuildOptions = {
        stdin: {
            contents: content(appName, index),
            resolveDir: dirFromImportMeta(import.meta.url),
        },
        bundle: true,
        format: 'iife',
        write: false,
        sourcemap: false,
        define: {
            // 为了避免在UT的时候被`vitest`给替换成`"test": '"development"'`这样子，增加一些动态计算
            ['0process.env.NODE_ENV0'.slice(1, -1)]: '"development"',
        },
    };
    const bundle = await build(options);
    return bundle.outputFiles?.[0].text;
};
