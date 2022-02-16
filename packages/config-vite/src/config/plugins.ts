import path from 'node:path';
import fs from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import template from 'lodash.template';
import {normalizeRuleMatch, pMap, resolve} from '@reskript/core';
import {getBabelConfig, BabelConfigOptions} from '@reskript/config-babel';
import {AppEntry, BuildContext, constructEntryTemplateData, resolveDevHost} from '@reskript/build-utils';
import {ConfigFactory} from '../interface.js';
import cssBind from '../plugins/cssBind/index.js';
import cssForceModules from '../plugins/cssForceModules/index.js';
import svgToComponent from '../plugins/svgToComponent/index.js';
import virtualEntry, {VirtualEntryOptions} from '../plugins/virtualEntry/index.js';

// 与`html-webpack-plugin`的`.ejs`处理对齐
const resolveTemplateContent = async (context: BuildContext<unknown>, entry: AppEntry<unknown>) => {
    const content = await fs.readFile(entry.template, 'utf8');
    const templateData = constructEntryTemplateData(context, entry);
    const render = template(content, {interpolate: /<%=([\s\S]+?)%>/g, variable: 'templateData'});
    return render(templateData);
};

const factory: ConfigFactory = async (context, options) => {
    const settings = context.projectSettings;
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
        polyfill: settings.build.script.polyfill,
        displayName: settings.build.script.displayName,
        cwd: context.cwd,
        srcDirectory: context.srcDirectory,
        openInEditorPrefix: ':origin/__open_in_editor__?file=',
    };
    const reactOptions = {
        babel: await settings.build.script.finalize(getBabelConfig(babelOptions), context),
        fastRefresh: context.usage === 'devServer' ? settings.devServer.hot : false,
    };
    const host = await resolveDevHost(options.host ?? 'localhost');
    const toVirtualEntryPlugin = async (entry: AppEntry<unknown>) => {
        const entryOptions: VirtualEntryOptions = {
            host,
            name: entry.name,
            entry: path.relative(context.cwd, entry.file),
            content: await resolveTemplateContent(context, entry),
            favicon: settings.build.favicon,
            appContainerId: settings.build.appContainerId,
            protocol: settings.devServer.https?.client ? 'https' : 'http',
            port: options.port ?? settings.devServer.port,
        };
        return virtualEntry(entryOptions);
    };
    return {
        plugins: [
            react.default(reactOptions),
            ...await pMap(context.entries, toVirtualEntryPlugin),
            cssBind({classNamesModule}),
            cssForceModules({enableModules: normalizeRuleMatch(context.cwd, settings.build.style.modules)}),
            svgToComponent(svgToComponentOptions),
        ],
    };
};

export default factory;
