import {LoaderContext} from 'webpack';
import {transformSvgToComponent} from '@reskript/build-utils';

export interface Options {
    displayName?: boolean;
}

export default async function svgToComponentLoader(this: LoaderContext<Options>, source: string) {
    this.cacheable();
    const callback = this.async();
    const {displayName = false} = this.getOptions();
    try {
        const code = await transformSvgToComponent(source, {displayName, resource: this.resourcePath});
        callback(null, code);
    }
    catch (ex) {
        const message = [
            `Failed to parse ${this.resourcePath}`,
            'please report to https://github.com/ecomfe/reskript/issues/new with svg\'s content',
        ];
        callback(new Error(message.join(', ')));
    }
}
