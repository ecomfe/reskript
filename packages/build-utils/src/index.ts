export {default as transformSvgToComponent} from './transformSvgToComponent.js';
export {default as lessConfig} from './config/less.js';
export {default as postcssConfig} from './config/postcss.js';
export {
    collectAppEntries,
    constructEntryTemplateData,
    interpolateEntryContent,
    EntryLocation,
    EntryOptions,
    AppEntry,
    BuildContext,
} from './entry/index.js';
export {hasServiceWorker, createRuntimeBuildEnv} from './info.js';
export {validateProjectSettings} from './validate.js';
export {ProxyOptions, constructProxyConfiguration} from './proxy.js';
export {resolveDevHost} from './host.js';
export {constructDefines, DefineContext} from './define.js';
export {createMiddlewareHook} from './devServer.js';
export {injectIntoHtml, serviceWorkerRegistryScript} from './html.js';
