import {WorkModeAware} from '@reskript/core';

export interface BuildCommandLineArgs extends WorkModeAware {
    readonly src: string;
    readonly buildTarget?: string;
    readonly featureOnly?: string;
    readonly entriesOnly?: string[];
    readonly analyze: boolean;
    readonly clean: boolean;
    readonly profile: boolean;
    readonly noSourceMaps: boolean;
}

export interface WebpackCompileAsset {
    readonly name: string;
    readonly size: number;
    readonly chunks: string[];
}
