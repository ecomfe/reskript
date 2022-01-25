import path from 'node:path';
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
    const parsedWrapper = await parseStringPromise(
        startTag + endTag,
        {
            attrNameProcessors: [
                name => {
                    // React有一些属性要换名字，不过应该只有`class`会用在`<svg>`元素上，其它的不处理了
                    if (name === 'class') {
                        return 'className';
                    }

                    return name.replace(/(?:-|_)([a-z])/g, (match, letter) => letter.toUpperCase());
                },
            ],
        }
    );
    return [removeNamespaceAttributes(parsedWrapper.svg.$), body] as const;
};

const resolveDisplayName = (filename: string) => {
    const base = path.basename(path.basename(filename), path.extname(filename));
    return pascalCase(base);
};

export interface Options {
    displayName?: boolean;
}

export default async function svgToComponentLoader(this: LoaderContext<Options>, source: string) {
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
            'import {createElement, forwardRef} from \'react\';',
            'const SVGToComponent = forwardRef(',
            '    (props, ref) => createElement(',
            '        \'svg\',',
            `        {${JSON.stringify(componentProps).slice(1, -1)}, ...props, ref}`,
            '    )',
            ');',
            displayName && `SVGToComponent.displayName = ${JSON.stringify(resolveDisplayName(this.resourcePath))};`,
            'export default SVGToComponent;',
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
