import path from 'node:path';
import fs from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import {VitePWA as pwa, VitePWAOptions} from 'vite-plugin-pwa';
import template from 'lodash.template';
import {normalizeRuleMatch, pMap, resolve, resolveCoreJsVersion} from '@reskript/core';
import {warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';
import {getBabelConfig, BabelConfigOptions} from '@reskript/config-babel';
import {
    AppEntry,
    constructEntryTemplateData,
    hasServiceWorker,
    injectIntoHtml,
    serviceWorkerRegistryScript,
} from '@reskript/build-utils';
import {createPortal, router} from '@reskript/portal';
import {BuildContext, ConfigFactory} from '../interface.js';
import portal from '../plugins/portal/index.js';
import cssBind from '../plugins/cssBind/index.js';
import cssForceModules from '../plugins/cssForceModules/index.js';
import svgToComponent from '../plugins/svgToComponent/index.js';
import virtualEntry, {EntryTarget, VirtualEntryOptions} from '../plugins/virtualEntry/index.js';

const resolveTemplateContent = async (context: BuildContext, entry: AppEntry<unknown>) => {
    const content = await fs.readFile(entry.template, 'utf8');
    const templateData = constructEntryTemplateData(context, entry);
    const render = template(content, {interpolate: /<%=([\s\S]+?)%>/g, variable: 'templateData'});
    return render(templateData);
};

const injectServiceWorkerScript = (html: string, enabled: boolean, context: BuildContext) => {
    if (!enabled) {
        return html;
    }

    const serviceWorkerLocation = {
        pubicPath: context.projectSettings.build.publicPath,
        path: `assets/service-worker-${context.buildTarget}.js`,
    };
    const scriptHtml = serviceWorkerRegistryScript(serviceWorkerLocation);
    return injectIntoHtml(html, {headEnd: scriptHtml});
};

const factory: ConfigFactory = async (context, options) => {
    const settings = context.projectSettings;
    // TODO: 这个应该不对，要用`resolveFrom`从当前目录找
    const classNamesModule = await resolve('classnames/bind');
    const svgToComponentOptions = {
        displayName: settings.build.script.displayName === 'auto'
            ? context.mode === 'development'
            : settings.build.script.displayName,
    };
    const babelOptions: BabelConfigOptions = {
        uses: settings.build.uses,
        mode: context.mode,
        // `@vitejs/plugin-react`本身就会加上热更新，这里再加会冲突
        hot: false,
        hostType: 'application',
        polyfill: settings.build.script.polyfill ? await resolveCoreJsVersion(context.cwd) : false,
        displayName: settings.build.script.displayName,
        cwd: context.cwd,
        srcDirectory: context.srcDirectory,
        openInEditorPrefix: ':origin/__open_in_editor__?file=',
    };
    const finalizedBabelConfig = await settings.build.script.finalize(getBabelConfig(babelOptions), context);
    warnAndExitOnInvalidFinalizeReturn(finalizedBabelConfig, 'build.script');

    const reactOptions = {
        babel: finalizedBabelConfig,
        fastRefresh: context.usage === 'devServer' ? settings.devServer.hot : false,
    };
    const requireServiceWorker = context.usage === 'build' && hasServiceWorker(context);
    const toEntryTarget = async (entry: AppEntry<unknown>): Promise<EntryTarget> => {
        return {
            name: entry.name,
            entry: path.relative(context.cwd, entry.file),
            content: settings.build.transformEntryHtml(
                injectServiceWorkerScript(
                    await resolveTemplateContent(context, entry),
                    requireServiceWorker,
                    context
                )
            ),
        };
    };
    const portalApp = createPortal();
    await settings.portal.setup(portalApp, {router});
    const entries = await pMap(context.entries, toEntryTarget);
    const entryOptions: VirtualEntryOptions = {
        entries,
        buildTarget: context.buildTarget,
        defaultEntry: entries.find(v => v.name === options.defaultEntry) ?? entries[0],
        favicon: settings.build.favicon,
        appContainerId: settings.build.appContainerId,
        publicPath: options.publicPath,
        customizeMiddleware: context.projectSettings.devServer.customizeMiddleware,
    };
    const pwaOptions: Partial<VitePWAOptions> = {
        mode: context.mode,
        strategies: 'injectManifest',
        srcDir: context.srcDirectory,
        outDir: 'dist/assets',
        filename: 'service-worker.js',
        injectRegister: false,
        manifest: false,
        injectManifest: {
            swSrc: path.join(context.cwd, context.srcDirectory, 'service-worker.js'),
            swDest: path.join(context.cwd, 'dist', 'assets', `service-worker-${context.buildTarget}.js`),
        },
    };

    return {
        plugins: [
            react(reactOptions),
            portal({app: portalApp}),
            virtualEntry(entryOptions),
            cssBind({classNamesModule}),
            cssForceModules({enableModules: normalizeRuleMatch(context.cwd, settings.build.style.modules)}),
            svgToComponent(svgToComponentOptions),
            requireServiceWorker && pwa(pwaOptions),
            // @ts-expect-error
            settings.build.legacy && legacy(),
        ],
    };
};

export default factory;
