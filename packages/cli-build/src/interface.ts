import {WorkModeAware} from '@reskript/core';

export interface BuildCommandLineArgs extends WorkModeAware {
    readonly srcDir: string;
    readonly entriesDir: string;
    readonly buildTarget?: string;
    readonly featureOnly?: string;
    readonly entriesOnly?: string[];
    readonly analyze: boolean;
    readonly clean: boolean;
    readonly profile: boolean;
    readonly sourceMaps: boolean;
    readonly cacheDir?: string;
}

export interface WebpackCompileAsset {
    readonly name: string;
    readonly size: number;
    readonly chunks: string[];
}
