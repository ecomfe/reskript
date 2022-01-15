import {resolveSync} from '@reskript/core';
import {getBabelConfig, BabelConfigOptions} from '@reskript/config-babel';
import {BuildEntry, warnAndExitOnInvalidFinalizeReturn} from '@reskript/settings';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async (entry: BuildEntry) => {
    const {usage, mode, cwd, srcDirectory, projectSettings: {build, devServer}} = entry;
    const {uses, script: {polyfill, displayName}} = build;
    const {hot} = devServer;
    const babelConfigOptions: BabelConfigOptions = {
        cwd,
        srcDirectory,
        mode,
        polyfill,
        uses,
        displayName,
        // 对于需要构建产物用的场合，默认不给热更新
        hot: usage === 'devServer' ? hot : false,
        hostType: 'application',
        openInEditorPrefix: ':origin/__open_in_editor__?file=',
    };
    const internalCreatedBabelConfig = getBabelConfig(babelConfigOptions);
    const finalizedBabelConfig = await build.script.finalize(internalCreatedBabelConfig, entry);
    warnAndExitOnInvalidFinalizeReturn(finalizedBabelConfig, 'build.script');

    return {
        loader: resolveSync('babel-loader'),
        // webpack的缓存够强了，所有其它的缓存都可以不开
        options: {
            ...finalizedBabelConfig,
            babelrc: false,
        },
    };
};

export default factory;
