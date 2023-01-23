import {PluginTarget} from '@babel/core';
import {ThirdPartyUse} from '@reskript/settings';
import {BabelConfigOptions, BabelConfigOptionsFilled} from './interface.js';

const DEFAULT_OPTIONS: BabelConfigOptionsFilled = {
    uses: ['lodash'],
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

type PluginTargetNeedCompat = PluginTarget | {default: PluginTarget};

export const compatPluginTarget = (target: PluginTargetNeedCompat): PluginTarget => {
    if (!target || typeof target !== 'object') {
        return target;
    }

    if ('default' in target) {
        return compatPluginTarget(target.default);
    }

    return target;
};
