export {ClientProjectSettings, ProjectSettings, WebpackProjectSettings, ViteProjectSettings} from './project.js';
export {
    BuildEntry,
    BuildEnv,
    CommandName,
    ReskriptDriver,
    RuntimeBuildEnv,
    WebpackBuildEntry,
    ViteBuildEntry,
} from './shared.js';
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
    WebpackBuildSettings,
    ViteBuildSettings,
} from './build.js';
export {
    CommandInput,
    HostType,
    TestTarget,
    BabelCommandLineArgs,
    BuildCommandLineArgs,
    DevCommandLineArgs,
    LintCommandLineArgs,
    PlayCommandLineArgs,
    TestCommandLineArgs,
} from './command.js';
export {DevServerHttps, DevServerSettings, WebpackDevServerSettings, ViteDevServerSettings} from './devServer.js';
export {PlaySettings} from './play.js';
export {SettingsPluginItem, SettingsPlugin} from './plugin.js';
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
