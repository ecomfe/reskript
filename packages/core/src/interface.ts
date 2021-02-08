export type CommandArgs = Array<[string, string] | [string, string, any]>;

type CommandRun<A> = ((args: string[], cmd: A) => Promise<void>)
    | ((arg: string, cmd: A) => Promise<void>)
    | ((cmd: A) => Promise<void>);

export interface CommandConfig<A> {
    command: string;
    description: string;
    args: CommandArgs;
    run: CommandRun<A>;
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
