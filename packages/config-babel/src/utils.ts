import {ThirdPartyUse} from '@reskript/settings';
import {BabelConfigOptions, BabelConfigOptionsFilled} from './interface.js';

const DEFAULT_OPTIONS: BabelConfigOptionsFilled = {
    uses: ['antd', 'lodash'],
    mode: 'development',
    hot: false,
    hostType: 'application',
    polyfill: false,
    modules: false,
    displayName: 'auto',
    cwd: process.cwd(),
    srcDirectory: 'src',
    openInEditorPrefix: '',
};

export const fillBabelConfigOptions = (options?: BabelConfigOptions): BabelConfigOptionsFilled => {
    return {...DEFAULT_OPTIONS, ...options};
};

export const shouldEnable = (library: ThirdPartyUse, config: ThirdPartyUse[]) => {
    return config.includes(library);
};
