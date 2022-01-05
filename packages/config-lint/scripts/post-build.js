const path = require('path');
const {rollup} = require('rollup');
const {babel} = require('@rollup/plugin-babel');

(async () => {
    const src = path.join(__dirname, '..', 'src', 'rules');
    const config = {
        input: {
            eslint: path.join(src, 'eslint.ts'),
            stylelint: path.join(src, 'stylelint.ts'),
        },
        external: () => true,
        plugins: [
            babel({plugins: ['@babel/plugin-transform-typescript'], extensions: ['.ts'], babelHelpers: 'bundled'}),
        ],
    };
    const bundle = await rollup(config);

    const outuput = {
        dir: path.join(__dirname, '..', 'config'),
        format: 'cjs',
        exports: 'default',
    };
    await bundle.write(outuput);
})();
