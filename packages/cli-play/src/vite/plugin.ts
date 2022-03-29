import fs from 'node:fs/promises';
import {Plugin} from 'vite';
import {buildEntryScript, resolveEntryPath, BuildEntryOptions} from '../utils/entry.js';


interface Options extends BuildEntryOptions {
    enableConcurrentMode: boolean;
}

export default function playEntryPlugin(options: Options): Plugin {
    return {
        name: 'reskript:play-entry',
        enforce: 'pre',
        async config() {
            return {
                optimizeDeps: {
                    entries: [
                        options.componentModulePath,
                    ],
                },
            };
        },
        resolveId(id) {
            if (id === '/playground-entry.jsx') {
                return id;
            }
        },
        async load(id) {
            if (id === '/playground-entry.jsx') {
                const content = await fs.readFile(resolveEntryPath(options.enableConcurrentMode), 'utf-8');
                return buildEntryScript(content, options);
            }
        },
    };
}
