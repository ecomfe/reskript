import {WorkModeAware} from '@reskript/core';

export interface BuildCommandLineArgs extends WorkModeAware {
    readonly configFile?: string;
    readonly srcDirectory: string;
    readonly entriesDirectory: string;
    readonly buildTarget?: string;
    readonly featureOnly?: string;
    readonly entriesOnly?: string[];
    readonly strict: boolean;
    readonly analyze: boolean;
    readonly clean: boolean;
    readonly profile: boolean;
    readonly sourceMaps: boolean;
    readonly cacheDirectory?: string;
}

export interface WebpackCompileAsset {
    readonly name: string;
    readonly size: number;
    readonly chunks: string[];
}
