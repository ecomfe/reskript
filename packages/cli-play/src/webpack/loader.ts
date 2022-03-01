import {LoaderContext} from 'webpack';
import {buildEntryScript, BuildEntryOptions} from '../utils/entry.js';

export default async function playEntryLoader(this: LoaderContext<BuildEntryOptions>, content: any) {
    if (this.cacheable) {
        this.cacheable();
    }

    const callback = this.async();

    const options = this.getOptions();
    const source = await buildEntryScript(content.toString(), options);
    callback(null, source);
}
