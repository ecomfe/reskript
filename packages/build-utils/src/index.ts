export {default as transformSvgToComponent} from './transformSvgToComponent.js';
export {default as lessConfig} from './config/less/index.js';
export {default as postcssConfig} from './config/postcss.js';
export {collectAppEntries, EntryLocation, EntryOptions, AppEntry} from './entry/index.js';
export {hasServiceWorker, revision} from './info.js';
export {checkFeatureMatrixSchema, checkPreCommitHookWhenLintDisabled} from './validate.js';
export {ProxyOptions, constructProxyConfiguration} from './proxy.js';
export {resolveDevHost} from './host.js';
