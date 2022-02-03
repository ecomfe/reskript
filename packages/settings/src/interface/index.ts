export {ClientProjectSettings, ProjectSettings} from './project.js';
export {BuildEntry, BuildEnv, CommandName, ReskriptDriver, RuntimeBuildEnv} from './shared.js';
export {FeatureMatrix} from './featureMatrix.js';
export {
    BuildInspectInitialResource,
    BuildInspectSettings,
    BuildScriptSettings,
    BuildSettings,
    BuildStyleSettings,
    OptionalRuleConfig,
    RuleConfig,
    Severity,
    SourceFilter,
    ThirdPartyUse,
} from './build.js';
export {DevServerHttps, DevServerSettings} from './devServer.js';
export {PlaySettings} from './play.js';
export {PluginOptions, SettingsPluginItem, SettingsPlugin} from './plugin.js';
export {
    BuildInternals,
    FinalizableWebpackConfiguration,
    InternalRules,
    LoaderFactory,
    LoaderType,
    RuleFactory,
    WebpackFinalize,
} from './webpack.js';

export type Listener = () => void;

export type Observe = (listener: Listener) => () => void;
