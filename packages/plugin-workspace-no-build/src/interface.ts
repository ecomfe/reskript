export interface Options {
    includes?: string[];
    excludes?: string[];
    styles?: boolean;
}

export interface PackageInfo {
    name: string;
    directory: string;
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}
