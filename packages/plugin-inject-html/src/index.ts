import {htmlEscape} from 'escape-goat';
import {ProjectSettings, SettingsPlugin} from '@reskript/settings';
import {injectIntoHtml} from '@reskript/build-utils';
import {TagDescription, InjectHtmlOptions} from './interface.js';

export type {InjectHtmlOptions};

const attributeToString = (name: string, value: string | true | undefined) => {
    if (value === undefined) {
        return '';
    }
    if (value === true) {
        return name;
    }
    return `${name}="${htmlEscape(value)}"`;
};

const toHtmlString = (description: TagDescription) => {
    const attributes = Object.entries(description.attributes ?? {}).reduce(
        (output, [key, value]) => {
            const part = attributeToString(key, value);
            return part ? `${output} ${part}` : output;
        },
        ''
    );
    const tagEnd = description.void ? '' : `</${description.tag}>`;
    return `<${description.tag}${attributes}>${description.children ?? ''}${tagEnd}`;
};

export default (options: InjectHtmlOptions): SettingsPlugin => {
    const enhance = <S extends ProjectSettings>(settings: S): S => {
        return {
            ...settings,
            build: {
                ...settings.build,
                transformEntryHtml: html => {
                    const prev = settings.build.transformEntryHtml(html);
                    const injectOptions = {
                        headStart: options.headStart?.map(toHtmlString).join('\n'),
                        headEnd: options.headEnd?.map(toHtmlString).join('\n'),
                        bodyStart: options.bodyStart?.map(toHtmlString).join('\n'),
                        bodyEnd: options.bodyEnd?.map(toHtmlString).join('\n'),
                    };
                    return injectIntoHtml(prev, injectOptions);
                },
            },
        };
    };

    return async (settings, cmd) => {
        if (options.enableOnCommand && !options.enableOnCommand.includes(cmd.commandName)) {
            return settings;
        }

        return enhance(settings);
    };
};
