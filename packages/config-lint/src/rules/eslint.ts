import {resolveSync} from '@reskript/core/willBreakingInternalUseOnly';
import {getParseOnlyBabelConfig} from '@reskript/config-babel/willBreakingInternalUseOnly';

// 为了支持 IDE 和代码编辑工具使用 eslint 的配置，在 build 阶段会生成一份 .eslintrc 文件。参阅 scripts/post-build.js

const config: Record<string, any> = {
    extends: [
        resolveSync('@ecomfe/eslint-config/strict'),
        resolveSync('@ecomfe/eslint-config/react/strict'),
        resolveSync('@ecomfe/eslint-config/typescript'),
    ],
    parserOptions: {
        babelOptions: getParseOnlyBabelConfig({mode: 'development'}),
    },
    plugins: ['jest', '@reskript'],
    settings: {
        react: {
            version: '17.0',
        },
    },
    env: {
        'jest': true,
    },
    globals: {
        $features: true,
        $build: true,
    },
    rules: {
        'operator-linebreak': [
            'error',
            'before',
            {
                overrides: {
                    '=': 'after',
                },
            },
        ],
        camelcase: ['error', {allow: ['^UNSAFE_']}],
        'react-hooks/exhaustive-deps': 'warn',
        // `useEffect`特别容易弄坏这个规则
        'consistent-return': 'off',
        'no-param-reassign': ['warn', {ignorePropertyModificationsFor: ['current']}],
        // 与ES6参数默认值冲突
        'react/require-default-props': 'off',
        '@reskript/import-order': 'error',
        '@reskript/hooks-deps-new-line': 'warn',
        '@reskript/no-excessive-hook': 'warn',
        '@reskript/spell-check': 'warn',
        // 这条规则太复杂，暂时配不出来，基本检查由`camelcase`规则负责
        '@typescript-eslint/naming-convention': 'off',
        // 这条规则与实际业务有冲突
        '@typescript-eslint/await-thenable': 'off',
        // 官方已经有对应规则
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
    },
    ignorePatterns: [
        '*.d.ts',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                // 严格一点
                '@typescript-eslint/no-misused-promises': ['warn', {checksVoidReturn: false}],
            },
        },
    ],
};

export default config;
