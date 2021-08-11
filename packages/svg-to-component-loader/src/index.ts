import path from 'path';
import {pascalCase} from 'change-case';
import {parseStringPromise} from 'xml2js';
import {LoaderContext} from 'webpack';

const removeNamespaceAttributes = (props: Record<string, unknown>): Record<string, unknown> => {
    return Object.entries(props).reduce(
        (output, [key, value]) => {
            if (!key.startsWith('xmlns:')) {
                output[key] = value;
            }
            return output;
        },
        {} as Record<string, unknown>
    );
};

const parseSVG = async (source: string) => {
    const startOfStartTag = source.indexOf('<svg');
    const endOfStartTag = source.indexOf('>', startOfStartTag);
    const startOfEndTag = source.lastIndexOf('<');
    const startTag = source.slice(startOfStartTag, endOfStartTag + 1);
    const endTag = source.slice(startOfEndTag);
    const body = source.slice(endOfStartTag + 1, startOfEndTag);
    const parsedWrapper = await parseStringPromise(startTag + endTag);
    return [removeNamespaceAttributes(parsedWrapper.svg.$), body] as const;
};

const resolveDisplayName = (filename: string) => {
    const base = path.basename(path.basename(filename), path.extname(filename));
    return pascalCase(base);
};

interface Options {
    displayName?: string;
}

export default async function lessSafeLoader(this: LoaderContext<Options>, source: string) {
    this.cacheable();
    const callback = this.async();
    const {displayName = false} = this.getOptions();
    try {
        const [svgProps, svgBody] = await parseSVG(source);
        const componentProps = {
            ...svgProps,
            dangerouslySetInnerHTML: {
                __html: svgBody,
            },
        };
        const lines = [
            'import {createElement} from \'react\';',
            'export default function SVGToComponent(props) {',
            `    return createElement('svg', ${JSON.stringify(componentProps)});`,
            '}',
            displayName && `SVGToComponent.displayName = ${JSON.stringify(resolveDisplayName(this.resourcePath))};`,
        ];
        callback(null, lines.filter(v => !!v).join('\n'));
    }
    catch (ex) {
        const message = [
            `Failed to parse ${this.resourcePath}`,
            'please report to https://github.com/ecomfe/reskript/issues/new with svg\'s content',
        ];
        callback(new Error(message.join(', ')));
    }
}
