import path from 'path';
import {fileURLToPath} from 'url';
import {rollup} from 'rollup';
import {babel} from '@rollup/plugin-babel';

(async () => {
    const project = path.join(fileURLToPath(import.meta.url), '..', '..');
    const config = {
        input: path.join(project, 'src', 'internal.ts'),
        external: id => {
            if (id.startsWith('.')) {
                return false;
            }

            return path.relative(path.join(project, 'src'), id).startsWith('..');
        },
        plugins: [
            {
                transform(code, id) {
                    if (id.endsWith('.ts')) {
                        return code.replace(/\.js';/g, '.ts\';');
                    }
                },
            },
            babel({plugins: ['@babel/plugin-transform-typescript'], extensions: ['.ts'], babelHelpers: 'bundled'}),
        ],
    };
    const bundle = await rollup(config);

    const outuput = {
        file: path.join(project, 'dist', 'internal.cjs'),
        format: 'cjs',
        exports: 'named',
    };
    await bundle.write(outuput);
})();
