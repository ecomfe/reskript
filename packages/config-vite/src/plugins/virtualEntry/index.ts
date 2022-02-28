import {Plugin} from 'vite';
import {interpolateEntryContent} from '@reskript/build-utils';
import {EntryTarget, VirtualEntryOptions} from './interface.js';
import viertualEntryResourcePlugin from './resource.js';
import injectElements from './inject.js';
import viertualEntryServerPlugin from './server.js';

export {EntryTarget, VirtualEntryOptions};

export default function viertualEntryPlugin(options: VirtualEntryOptions): Plugin[] {
    const root = {value: process.cwd()};
    const render = ({content, entry}: EntryTarget, devElements: boolean) => {
        const html = injectElements(content, {...options, entry, devElements, root: root.value});
        return interpolateEntryContent(html, process.env);
    };
    const toResourcePlugin = (entry: EntryTarget) => {
        const content = render(entry, false);
        return viertualEntryResourcePlugin({content, name: `${entry.name}-${options.buildTarget}`});
    };
    const devHtml = render(options.defaultEntry, true);

    return [
        ...options.entries.map(toResourcePlugin),
        viertualEntryServerPlugin({...options, ...options.defaultEntry, content: devHtml}),
    ];
}
