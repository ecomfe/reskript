import {validate} from 'schema-utils';

const sourceFilterSchema = {
    type: 'object',
    properties: {
        includes: {
            items: {
                type: 'string',
            },
            type: 'array',
        },
        excludes: {
            items: {
                type: 'string',
            },
            type: 'array',
        },
    },
    additionalProperties: false,
};

const severitySchema = {
    type: 'string',
    enum: ['off', 'print', 'warn', 'error'],
};

const ruleConfig = (valueSchema: any) => {
    return {
        anyOf: [
            {
                type: 'string',
                enum: ['off', 'print'],
            },
            {
                type: 'array',
                items: [
                    severitySchema,
                    valueSchema,
                ],
                additionalItems: false,
            },
        ],
    };
};

const optionalRuleConfig = (valueSchema: any) => {
    return {
        anyOf: [
            severitySchema,
            {
                type: 'array',
                items: [
                    severitySchema,
                    valueSchema,
                ],
                additionalItems: false,
            },
        ],
    };
};

// `schema`并不是一个完全符合JSON Schema的东西
const schema: any = {
    properties: {
        provider: {
            enum: ['webpack'],
            type: 'string',
        },
        featureMatrix: {
            additionalProperties: {
                additionalProperties: true,
                type: 'object',
            },
            type: 'object',
        },
        build: {
            properties: {
                uses: {
                    items: {
                        enum: ['antd', 'lodash', 'styled-components', 'emotion', 'reflect-metadata', 'tailwind'],
                        type: 'string',
                    },
                    type: 'array',
                },
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
                appContainerId: {
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
                publicPath: {
                    type: 'string',
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
                        displayName: {
                            type: 'boolean',
                        },
                        finalize: {
                            instanceof: 'Function',
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
                inspect: {
                    type: 'object',
                    properties: {
                        initialResources: {
                            type: 'object',
                            properties: {
                                count: ruleConfig({type: 'number'}),
                                totalSize: ruleConfig({type: 'number'}),
                                sizeDeviation: ruleConfig({type: 'number'}),
                                disallowImports: ruleConfig({type: 'array', items: {type: 'string'}}),
                            },
                            additionalProperties: false,
                        },
                        duplicatePackages: optionalRuleConfig(sourceFilterSchema),
                        htmlImportable: optionalRuleConfig(sourceFilterSchema),
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
                proxyRewrite: {
                    additionalProperties: {
                        type: 'string',
                    },
                    type: 'object',
                },
                hot: {
                    type: 'boolean',
                },
                https: {
                    anyOf: [
                        {
                            properties: {
                                proxy: {
                                    type: 'boolean',
                                },
                                client: {
                                    type: 'boolean',
                                },
                                serverOptions: {
                                    type: 'object',
                                },
                            },
                            additionalProperties: false,
                            type: 'object',
                        },
                        {
                            type: 'boolean',
                        },
                    ],
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
                defaultEnableConcurrentMode: {
                    type: 'boolean',
                },
                defaultGlobalSetup: {
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
