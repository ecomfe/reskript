import {RuntimeBuildEnv, BuildEntry} from '@reskript/settings';
import {AppEntry} from '@reskript/build-utils';
import {Configuration, RuleSetUseItem, EntryObject} from 'webpack';

type EntryDescriptor = Exclude<EntryObject[string], string | string[]>;

export interface EntryConfig {
    entry?: Omit<EntryDescriptor, 'import'>;
    html?: Record<string, any>;
}

export interface BuildContext extends RuntimeBuildEnv {
    readonly features: Record<string, any>;
    readonly buildTarget: string;
    readonly isDefaultTarget: boolean;
    readonly entries: Array<AppEntry<EntryConfig>>;
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
