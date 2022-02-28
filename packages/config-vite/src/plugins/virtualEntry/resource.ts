import path from 'node:path';
import {Plugin} from 'vite';
import {ResourceOptions} from './interface.js';

export default function viertualEntryResourcePlugin(options: ResourceOptions): Plugin {
    const root = {value: process.cwd()};

    return {
        name: 'reskript:virtual-entry-resource',
        enforce: 'pre',
        async configResolved(config) {
            root.value = config.root;
        },
        resolveId(id) {
            if (id === path.join(root.value, `${options.name}.html`)) {
                // 此处必须是原路径，因为最后Vite是依赖它来产出具体文件的
                return id;
            }
        },
        load(id) {
            if (id === path.join(root.value, `${options.name}.html`)) {
                return options.content;
            }
        },
    };
}
