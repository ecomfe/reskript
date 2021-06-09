import {WorkModeAware} from '@reskript/core';

export interface LegacyBuildCommandLineArgs extends WorkModeAware {
    readonly src?: string;
    readonly srcDir: string;
    readonly entriesDir: string;
    readonly buildTarget?: string;
    readonly featureOnly?: string;
    readonly entriesOnly?: string[];
    readonly analyze: boolean;
    readonly clean: boolean;
    readonly profile: boolean;
    readonly sourceMaps: boolean;
}

export type BuildCommandLineArgs = Omit<LegacyBuildCommandLineArgs, 'src'>;

export interface WebpackCompileAsset {
    readonly name: string;
    readonly size: number;
    readonly chunks: string[];
}
