import {RuntimeBuildEnv, FeatureSet, BuildEntry} from '@reskript/settings';
import {Configuration, RuleSetUseItem, EntryObject} from 'webpack';

type EntryDescriptor = Exclude<EntryObject[string], string | string[]>;

export interface EntryLocation {
    cwd: string;
    srcDirectory: string;
    entryDirectory: string;
    only?: string[];
}

export interface EntryConfig {
    entry?: Omit<EntryDescriptor, 'import'>;
    html?: Record<string, any>;
}

export interface AppEntry {
    readonly file: string;
    readonly name: string;
    readonly template: string | null;
    readonly config: EntryConfig;
}

export interface BuildContext extends RuntimeBuildEnv {
    readonly features: FeatureSet;
    readonly buildTarget: string;
    readonly isDefaultTarget: boolean;
    readonly entries: AppEntry[];
}

export type LoaderFactory = (entry: BuildEntry) => Promise<RuleSetUseItem | null>;

export type ConfigurationFactory = (entry: BuildContext) => Configuration | Promise<Configuration>;

export interface StrictOptions {
    // 禁止使用`require.ensure`、`require.include`、`require.context`
    disableRequireExtension?: boolean;
    // 所有的模块路径都是大小写敏感的
    caseSensitiveModuleSource?: boolean;
    // 开启类型检查
    typeCheck?: boolean;
}
