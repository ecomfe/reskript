import * as babel from '@babel/core';
import {sync as resolve} from 'resolve';

// 用来解决`node_modules`下有些包是ESM的问题
export = {
    process: (src: string, filename: string) => {
        // 比较严格的规则，要求`import`或`export`在一行的开头处
        if (/^(import|export) /m.test(src)) {
            const result = babel.transformSync(
                src,
                {
                    filename,
                    plugins: [
                        resolve('@babel/plugin-transform-modules-commonjs'),
                    ],
                }
            );
            return result?.code ?? src;
        }

        return src;
    },
};
