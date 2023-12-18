import {WorkMode, WorkModeAware, ProjectAware} from '@reskript/core';
import {ThirdPartyUse} from './build.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HostType = 'localhost' | 'loopback' | 'ip' | {} & string;

export interface BabelCommandLineArgs {
    mode: WorkMode;
    polyfill: boolean;
    clean: boolean;
    outDirectory?: string;
    copy: boolean;
    uses: ThirdPartyUse[];
}

export interface BuildCommandLineArgs extends WorkModeAware {
    readonly configFile?: string;
    readonly envFiles?: string[];
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
    readonly watch: boolean;
}

export interface DevCommandLineArgs extends WorkModeAware {
    readonly configFile?: string;
    readonly envFiles?: string[];
    readonly srcDirectory: string;
    readonly entriesDirectory: string;
    readonly buildTarget: string;
    readonly proxyDomain?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly host?: HostType;
    readonly entry: string;
    readonly strict: boolean;
    readonly open: boolean;
}

export interface LintCommandLineArgs {
    readonly changed: boolean;
    readonly staged: boolean;
    readonly allowUnsafeReactMethod: boolean;
    readonly fix: boolean;
    readonly strict: boolean;
    readonly autoStage: boolean;
}

export interface PlayCommandLineArgs extends ProjectAware {
    readonly configFile?: string;
    readonly envFiles?: string[];
    readonly buildTarget: string;
    readonly port: number;
    readonly host: HostType;
    readonly concurrentMode?: boolean;
    readonly setup?: string;
}

export type TestTarget = 'react' | 'node';

export interface TestCommandLineArgs extends ProjectAware {
    readonly configFile?: string;
    readonly envFiles?: string[];
    readonly target: TestTarget;
    readonly jestArgs: string[];
}

interface Build extends BuildCommandLineArgs {
    commandName: 'build';
}

interface Babel extends BabelCommandLineArgs {
    commandName: 'babel';
}

interface Test extends TestCommandLineArgs {
    commandName: 'test';
}

interface Dev extends DevCommandLineArgs {
    commandName: 'dev';
}

interface Lint extends LintCommandLineArgs {
    commandName: 'lint';
}

interface Play extends PlayCommandLineArgs {
    commandName: 'play';
}

export type CommandInput = ProjectAware & (Build | Babel | Test | Dev | Lint | Play);
