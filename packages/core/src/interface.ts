export interface CommandDefinition<A> {
    run(args: A, rest?: string[] | string): Promise<void>;
}

export type WorkMode = 'production' | 'development';

export interface ProjectAware {
    readonly cwd: string;
}

export interface WorkModeAware extends ProjectAware {
    readonly mode: WorkMode;
}

export interface PackageInfo {
    [key: string]: unknown;
    readonly name: string;
    readonly version: string;
    readonly scripts?: Record<string, string>;
    readonly dependencies?: Record<string, string>;
    readonly devDependencies?: Record<string, string>;
    readonly peerDependencies?: Record<string, string>;
    readonly workspaces?: string[] | {packages: string[]};
    readonly husky?: Record<string, Record<string, string>>;
}
