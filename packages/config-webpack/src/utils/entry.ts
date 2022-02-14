import {EntryObject} from 'webpack';
import {AppEntry} from '@reskript/build-utils';
import {EntryConfig} from '../interface.js';

export const convertToWebpackEntry = ({file, config}: AppEntry<EntryConfig>): EntryObject[string] => {
    if (config.entry) {
        return {
            import: file,
            ...config.entry,
        };
    }

    return file;
};
