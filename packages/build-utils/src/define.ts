import {WorkMode} from '@reskript/core';

const toDefines = (context: Record<string, any>, prefix: string): Record<string, string> => {
    const entries = Object.entries(context);
    const defines = entries.map(([key, value]) => [prefix + '.' + key, JSON.stringify(value)]);
    return defines.reduce((output, [key, value]) => Object.assign(output, {[key]: value}), {});
};

export interface DefineContext {
    env: Record<string, string | undefined>;
    features: Record<string, any>;
    mode: WorkMode;
    buildVersion: string;
    buildTarget: string;
    buildTime: string;
}

export const constructDefines = ({env, features, mode, buildVersion, buildTarget, buildTime}: DefineContext) => {
    const buildInfo = {
        mode,
        version: buildVersion,
        target: buildTarget,
        time: buildTime,
    };

    return {
        ...toDefines(env, 'process.env'),
        ...toDefines(features, 'skr.features'),
        ...toDefines(buildInfo, 'skr.build'),
    };
};
