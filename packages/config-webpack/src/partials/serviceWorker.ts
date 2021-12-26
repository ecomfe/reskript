import path from 'path';
import fs from 'fs/promises';
import {InjectManifest, InjectManifestOptions} from 'workbox-webpack-plugin';
import ExtraScriptPlugin, {ScriptFactoryContext} from '@reskript/webpack-plugin-extra-script';
import {BuildContext, ConfigurationFactory} from '../interface.js';

const generateRegisterScript = (buildContext: BuildContext, scriptContext: ScriptFactoryContext) => {
    const publicPath = scriptContext.publicPath === 'auto' ? '/' : scriptContext.publicPath;
    const serviceWorkerURL = `${publicPath}assets/service-worker-${buildContext.buildTarget}.js`;
    return `
        if ('serviceWorker' in navigator) {
            window.addEventListener(
                'load',
                function () {
                    navigator.serviceWorker.register('${serviceWorkerURL}');
                }
            );
        }
    `;
};

const requireManifestInjection = async (source: string) => {
    const content = await fs.readFile(source, 'utf-8');
    return content.includes('self.__WB_MANIFEST');
};

const factory: ConfigurationFactory = async entry => {
    const {mode, cwd, srcDirectory, buildTarget} = entry;
    const serviceWorkerSource = path.join(cwd, srcDirectory, 'service-worker.js');
    const injectServieWorkerRegistrationPlugin = new ExtraScriptPlugin(
        context => ({content: generateRegisterScript(entry, context)}),
        {prepend: true}
    );

    const shouldInjectManifest = await requireManifestInjection(serviceWorkerSource);
    if (shouldInjectManifest) {
        const options: InjectManifestOptions = {
            mode,
            swSrc: serviceWorkerSource,
            swDest: `service-worker-${buildTarget}.js`,
        };
        return {
            plugins: [
                new InjectManifest(options),
                injectServieWorkerRegistrationPlugin,
            ],
        };
    }

    return {
        entry: {
            serviceWorker: {
                import: serviceWorkerSource,
                filename: `service-worker-${buildTarget}.js`,
            },
        },
        plugins: [
            injectServieWorkerRegistrationPlugin,
        ],
    };
};

export default factory;
