import path from 'node:path';
import fs from 'node:fs/promises';
import {Plugin} from 'vite';
import {transformSvgToComponent} from '@reskript/build-utils';

const VIRTURL_ID_PREFIX = 'virtual:reskript-svg-to-component/';

export interface Options {
    displayName?: boolean;
}

export default function svgComponentPlugin({displayName = false}: Options = {}): Plugin {
    const root = {value: process.cwd()};

    return {
        name: 'reskript:svg-to-component',
        enforce: 'pre',
        configResolved(config) {
            root.value = config.root;
        },
        async resolveId(source, importer, options) {
            if (source.endsWith('.svg?react')) {
                const resourceId = source.replace(/\?react$/, '');
                const resolved = await this.resolve(resourceId, importer, {...options, skipSelf: true});
                return resolved && VIRTURL_ID_PREFIX + resolved.id;
            }
        },
        async load(id) {
            if (id.startsWith(VIRTURL_ID_PREFIX)) {
                const resource = id.slice(VIRTURL_ID_PREFIX.length);
                const svgSource = await fs.readFile(path.resolve(root.value, resource), 'utf-8');
                const code = await transformSvgToComponent(svgSource, {resource, displayName});
                return code;
            }
        },
    };
}
