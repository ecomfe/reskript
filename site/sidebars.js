module.exports = {
    docs: [
        'getting-started',
        {
            type: 'category',
            label: '应用开发',
            items: [
                'app/quick-start',
                'app/component',
                'app/style',
                'app/svg',
                'app/local-dev',
                'app/unit-test',
                'app/build-deploy',
            ],
        },
        {
            type: 'category',
            label: '配置',
            items: [
                'settings/settings',
                'settings/feature-matrix',
                'settings/build',
                'settings/dev-server',
                'settings/play',
                'settings/plugins',
            ],
        },
        {
            type: 'category',
            label: '命令行',
            items: [
                'cli/introduction',
                'cli/build',
                'cli/dev',
                'cli/lint',
                'cli/test',
                'cli/play',
                'cli/babel',
                'cli/doctor',
                'cli/init',
            ],
        },
        {
            type: 'category',
            label: '高阶应用',
            items: [
                'advanced/custom-env',
                'advanced/lint-rules',
                'advanced/service-worker',
                'advanced/config-insiders',
                'advanced/multiple-entry',
                'advanced/browsers-list',
                'advanced/web-worker',
                'advanced/debug-component',
            ],
        },
        {
            type: 'category',
            label: '插件',
            items: [
                'plugins/sass',
                'plugins/qiankun',
                'plugins/workspace-no-build',
            ],
        },
        {
            type: 'category',
            label: '版本升级手册',
            items: [
                'migration/v2',
            ],
        },
        'faq',
    ],
};
