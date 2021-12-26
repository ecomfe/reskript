import path from 'path';
import {fileURLToPath} from 'url';
import {rollup} from 'rollup';
import {babel} from '@rollup/plugin-babel';

(async () => {
    const project = path.join(fileURLToPath(import.meta.url), '..', '..');
    const src = path.join(project, 'src');
    const config = {
        input: {
            eslint: path.join(src, 'rules', 'eslint.ts'),
            stylelint: path.join(src, 'rules', 'stylelint.ts'),
            patch: path.join(src, 'patch.ts'),
        },
        external: () => true,
        plugins: [
            babel({plugins: ['@babel/plugin-transform-typescript'], extensions: ['.ts'], babelHelpers: 'bundled'}),
        ],
    };
    const bundle = await rollup(config);

    const outuput = {
        dir: path.join(project, 'config'),
        format: 'cjs',
        exports: 'default',
        entryFileNames: '[name].cjs',
    };
    await bundle.write(outuput);
})();
