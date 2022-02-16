import path from 'node:path';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async (context, options) => {
    const settings = context.projectSettings;
    const input = context.entries.reduce(
        (input, current) => {
            input[current.name] = path.join(context.cwd, `${current.name}.html`);
            return input;
        },
        {} as Record<string, string>
    );

    return {
        build: {
            target: 'modules',
            outDir: 'dist',
            assetsDir: 'assets',
            assetsInlineLimit: settings.build.largeAssetSize,
            sourcemap: options.sourceMaps,
            emptyOutDir: options.clean,
            commonjsOptions: {
                include: '**/node_modules/**',
            },
            rollupOptions: {input},
        },
    };
};

export default factory;
