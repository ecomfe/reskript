import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {svgToComponent} from '@reskript/config-vite/plugins';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(currentDirectory, '..', 'src');

function resolveCompat() {
    return {
        name: 'resolve-compat',
        async resolveId(source, importer, options) {
            if ((source.includes(src) || importer.includes(src)) && source.endsWith('.js')) {
                const resolved = await this.resolve(source.slice(0, -3), importer, {...options, skipSelf: true});
                return resolved;
            }
        },
    };
}

const config = {
    mode: 'production',
    build: {
        emptyOutDir: false,
        outDir: 'dist/Playground',
        lib: {
            entry: path.resolve(src, 'Playground', 'index.tsx'),
            name: 'Playground',
            formats: ['es'],
            fileName: () => 'index.js',
        },
        rollupOptions: {
            external: [/^react(\/|$)/, /^react-dom(\/|$)/],
        },
    },
    plugins: [
        resolveCompat(),
        react(),
        svgToComponent({displayName: true}),
    ],
};

build(config);
