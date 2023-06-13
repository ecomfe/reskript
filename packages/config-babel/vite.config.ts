import {resolve} from '@reskript/core';

// TODO: https://github.com/emotion-js/emotion/issues/2973
export default async () => {
    const emotionBabelPlugin = await resolve('@emotion/babel-plugin/dist/emotion-babel-plugin.cjs.js');

    return {
        resolve: {
            alias: {
                '@emotion/babel-plugin': emotionBabelPlugin,
            },
        },
        test: {
            include: [
                '**/__tests__/**/*.test.[jt]s',
            ],
        },
    };
};
