import {validate} from 'schema-utils';

// `schema`并不是一个完全符合JSON Schema的东西
const schema: any = {
    properties: {
        featureMatrix: {
            additionalProperties: {
                additionalProperties: true,
                type: 'object',
            },
            type: 'object',
        },
        build: {
            properties: {
                appTitle: {
                    type: 'string',
                },
                excludeFeatures: {
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
                favicon: {
                    type: 'string',
                },
                largeAssetSize: {
                    type: 'number',
                },
                reportLintErrors: {
                    type: 'boolean',
                },
                thirdParty: {
                    type: 'boolean',
                },
                finalize: {
                    instanceof: 'Function',
                },
                script: {
                    type: 'object',
                    properties: {
                        babel: {
                            anyOf: [
                                {type: 'boolean'},
                                {instanceof: 'Function'},
                            ],
                        },
                        polyfill: {
                            type: 'boolean',
                        },
                        finalize: {
                            instanceof: 'Function',
                        },
                        defaultImportOptimization: {
                            type: 'boolean',
                        },
                    },
                    additionalProperties: false,
                },
                style: {
                    type: 'object',
                    properties: {
                        lessVariables: {
                            additionalProperties: {
                                type: 'string',
                            },
                            type: 'object',
                        },
                        extract: {
                            type: 'boolean',
                        },
                        resources: {
                            items: {
                                type: 'string',
                            },
                            type: 'array',
                        },
                        modules: {
                            anyOf: [
                                {type: 'boolean'},
                                {instanceof: 'Function'},
                            ],
                        },
                    },
                    additionalProperties: false,
                },
            },
            additionalProperties: false,
            type: 'object',
        },
        devServer: {
            properties: {
                apiPrefixes: {
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
                defaultProxyDomain: {
                    type: 'string',
                },
                hot: {
                    enum: ['all', 'none', 'simple'],
                    type: 'string',
                },
                https: {
                    type: 'boolean',
                },
                openPage: {
                    type: 'string',
                },
                port: {
                    type: 'number',
                },
                finalize: {
                    instanceof: 'Function',
                },
            },
            additionalProperties: false,
            type: 'object',
        },
        play: {
            properties: {
                injectResources: {
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
                wrapper: {
                    type: 'string',
                },
            },
            additionalProperties: false,
            type: 'object',
        },
        plugins: {
            anyOf: [
                {
                    items: {
                        instanceof: 'Function',
                    },
                    type: 'array',
                },
                {
                    instanceof: 'Function',
                },
            ],
        },
    },
    additionalProperties: false,
    type: 'object',
};

export default (value: any): void => {
    validate(schema, value, {name: 'Your reskript.config.js'});
};
