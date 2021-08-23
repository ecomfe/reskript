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

export interface PackageJSON {
    readonly name: string;
    readonly version: string;
    readonly dependencies: Record<string, string>;
    readonly devDependencies: Record<string, string>;
    readonly workspaces?: string[] | {packages: string[]};
}
