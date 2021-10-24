import {PackageInfo} from '@reskript/core';

export interface Options {
    includes?: string[];
    excludes?: string[];
    styles?: boolean;
}

export interface LocalPackageInfo extends PackageInfo {
    directory: string;
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}
