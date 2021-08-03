import path from 'path';
import {pascalCase} from 'change-case';
import dedent from 'dedent';
import {parseStringPromise} from 'xml2js';
import {LoaderContext} from 'webpack';

const deprecationMessage = (filename: string) => {
    return dedent`
        import {ReactComponent} from '*.svg' is deprecated, please use import ReactComponent from '*.svg?react' instead.
        This warning emits because you imported {ReactComponent} from ${filename}
    `;
};

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
    const endOfStartTag = source.indexOf('>');
    const startOfEndTag = source.lastIndexOf('<');
    const startTag = source.slice(0, endOfStartTag + 1);
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
    deprecationWarning?: boolean;
    displayName?: string;
}

export default async function lessSafeLoader(this: LoaderContext<Options>, source: string) {
    this.cacheable();
    const callback = this.async();
    const {deprecationWarning = false, displayName = false} = this.getOptions();
    const [svgProps, svgBody] = await parseSVG(source);
    const componentProps = {
        ...svgProps,
        dangerouslySetInnerHTML: {
            __html: svgBody,
        },
    };
    const lines = [
        'import {createElement} from \'react\';',
        `export const url = new URL('${this.resourcePath}?asset', import.meta.url);`,
        'export const ReactComponent = props => {',
        deprecationWarning && `console.warn(${JSON.stringify(deprecationMessage(this.resourcePath))})`,
        `return createElement('svg', ${JSON.stringify(componentProps)});`,
        '};',
        displayName && `ReactComponent.displayName = ${JSON.stringify(resolveDisplayName(this.resourcePath))};`,
        'export default url;',
    ];
    callback(null, lines.filter(v => !!v).join('\n'));
}
