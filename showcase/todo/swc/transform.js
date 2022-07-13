const transform = require('./binding').transform;

function toBuffer(t) {
    return Buffer.from(JSON.stringify(t));
}

const options = {
    jsc: {
        externalHelpers: true,
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: false,
            jsx: true,
            importAssertions: true,
        },
        experimental: {
            keepImportAssertions: true,
            plugins: [],
            // cacheRoot: '/Users/weijiaxun/Project/swc-emotion/with-emotion-swc-app/.next/cache/swc',
        },
        transform: {
            legacyDecorator: false,
            decoratorMetadata: false,
            useDefineForClassFields: false,
            react: {
                importSource: '@emotion/react',
                runtime: 'automatic',
                throwIfNamespace: true,
                development: false,
                useBuiltins: true,
                refresh: false,
            },
            optimizer: {
                simplify: false,
                globals: {
                    typeofs: {
                        window: 'undefined',
                    },
                    envs: {
                        NODE_ENV: '"production"',
                    },
                },
            },
            // regenerator: {
            //     importPath:
            //         '/Users/weijiaxun/Project/swc-emotion/with-emotion-swc-app/node_modules/.pnpm/next@12.2.2_sfoxds7t5ydpegc3knd667wn6m/node_modules/next/dist/compiled/regenerator-runtime/runtime.js',
            // },
        },
    },
    sourceMaps: true,
    styledComponents: null,
    emotion: {
        enabled: true,
        autoLabel: false,
        sourcemap: true,
    },
    disableNextSsg: true,
    disablePageConfig: true,
    isDevelopment: false,
    isServer: true,
    // pagesDir: '/Users/weijiaxun/Project/swc-emotion/with-emotion-swc-app/pages',
    isPageFile: true,
    env: {
        targets: {
            node: '16.15.0',
        },
    },
    filename: '/Users/otakustay/Develop/reskript/showcase/todo/src/components/App/index.tsx',
    inlineSourcesContent: false,
    sourceFileName: '/Users/otakustay/Develop/reskript/showcase/todo/src/components/App/index.tsx',
};

transform(undefined, true, toBuffer(options)).then((...args) => {
    console.log(...args);
});
