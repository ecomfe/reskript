import {WebpackBuildEntry, WebpackProjectSettings} from '@reskript/settings';
import {BuildContext as BuildContextGeneric} from '@reskript/build-utils';
import {Configuration, RuleSetUseItem, EntryObject} from 'webpack';

type EntryDescriptor = Exclude<EntryObject[string], string | string[]>;

export interface EntryConfig {
    entry?: Omit<EntryDescriptor, 'import'>;
    html?: Record<string, any>;
}

export type LoaderFactory = (entry: WebpackBuildEntry) => Promise<RuleSetUseItem | null>;

export type BuildContext = BuildContextGeneric<EntryConfig, WebpackProjectSettings>;

export type ConfigurationFactory = (entry: BuildContext) => Configuration | Promise<Configuration>;

export interface StrictOptions {
    // 禁止使用`require.ensure`、`require.include`、`require.context`
    disableRequireExtension?: boolean;
    // 所有的模块路径都是大小写敏感的
    caseSensitiveModuleSource?: boolean;
    // 开启类型检查
    typeCheck?: boolean;
}
