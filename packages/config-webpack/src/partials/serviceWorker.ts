import path from 'node:path';
import fs from 'node:fs/promises';
import {InjectManifest, InjectManifestOptions} from 'workbox-webpack-plugin';
import {injectIntoHtml, serviceWorkerRegistryScript} from '@reskript/build-utils';
import {TransformHtmlWebpackPlugin} from '../utils/plugin.js';
import {ConfigurationFactory} from '../interface.js';

const requireManifestInjection = async (source: string) => {
    const content = await fs.readFile(source, 'utf-8');
    return content.includes('self.__WB_MANIFEST');
};

const factory: ConfigurationFactory = async entry => {
    const {mode, cwd, srcDirectory, buildTarget, projectSettings} = entry;
    const serviceWorkerSource = path.join(cwd, srcDirectory, 'service-worker.js');
    const serviceWorkerLocation = {
        pubicPath: projectSettings.build.publicPath,
        path: `assets/service-worker-${buildTarget}.js`,
    };
    const scriptHtml = serviceWorkerRegistryScript(serviceWorkerLocation);
    const transformPlugin = new TransformHtmlWebpackPlugin(html => injectIntoHtml(html, {headEnd: scriptHtml}));

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
                transformPlugin,
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
            transformPlugin,
        ],
    };
};

export default factory;
