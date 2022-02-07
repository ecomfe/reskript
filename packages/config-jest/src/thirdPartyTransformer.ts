// 在CJS环境下要用`import *`，在ESM环境下要用`import default`
import * as babel from '@babel/core';
import pluginTransformCommonJS from '@babel/plugin-transform-modules-commonjs';

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
                        pluginTransformCommonJS,
                    ],
                }
            );
            return result?.code ?? src;
        }

        return src;
    },
};
