import {RuntimeBuildEnv, FeatureSet, BuildEntry} from '@reskript/settings';
import {Configuration, RuleSetUseItem} from 'webpack';

export interface AppEntry {
    readonly file: string;
    readonly name: string;
    readonly template: string | null;
    readonly config: Record<string, any>;
}

export interface BuildContext extends RuntimeBuildEnv {
    readonly features: FeatureSet;
    readonly buildTarget: string;
    readonly isDefaultTarget: boolean;
    readonly entries: AppEntry[];
}

export type LoaderFactory = (entry: BuildEntry) => RuleSetUseItem | null;

export type ConfigurationFactory = (entry: BuildContext) => Configuration;
