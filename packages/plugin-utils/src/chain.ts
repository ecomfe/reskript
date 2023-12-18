import {
    CustomizeMiddleware,
    ProjectSettings,
    SetupPortal,
    ViteFinalize,
    ViteProjectSettings,
    WebpackFinalize,
    WebpackProjectSettings,
} from '@reskript/settings';

export const chainWebpackFinalize = (settings: WebpackProjectSettings, chain: WebpackFinalize) => {
    const wrapped: WebpackProjectSettings = {
        ...settings,
        build: {
            ...settings.build,
            finalize: async (webpackConfig, buildEntry, internals) => {
                const prev = await settings.build.finalize(webpackConfig, buildEntry, internals);
                return chain(prev, buildEntry, internals);
            },
        },
    };
    return wrapped;
};

export const chainViteFinalize = (settings: ViteProjectSettings, chain: ViteFinalize) => {
    const wrapped: ViteProjectSettings = {
        ...settings,
        build: {
            ...settings.build,
            finalize: async (viteConfig, buildEntry) => {
                const prev = await settings.build.finalize(viteConfig, buildEntry);
                return chain(prev, buildEntry);
            },
        },
    };
    return wrapped;
};

interface FinalizeOptions {
    webpack?: WebpackFinalize;
    vite?: ViteFinalize;
}

export const chainBuildFinalize = (settings: ProjectSettings, chain: FinalizeOptions) => {
    if (settings.driver === 'webpack') {
        return chain.webpack ? chainWebpackFinalize(settings, chain.webpack) : settings;
    }
    return chain.vite ? chainViteFinalize(settings, chain.vite) : settings;
};

export const chainCustomizeMiddleware = <S extends ProjectSettings>(settings: S, chain: CustomizeMiddleware) => {
    const wrapped: S = {
        ...settings,
        devServer: {
            ...settings.devServer,
            customizeMiddleware: customization => {
                settings.devServer.customizeMiddleware(customization);
                chain(customization);
            },
        },
    };
    return wrapped;
};

export const chainSetupPortal = <S extends ProjectSettings>(settings: S, chain: SetupPortal) => {
    const wrapped: S = {
        ...settings,
        portal: {
            ...settings.portal,
            setup: async (app, helper) => {
                await settings.portal.setup(app, helper);
                chain(app, helper);
            },
        },
    };
    return wrapped;
};
