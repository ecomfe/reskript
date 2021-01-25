module.exports = {
    docs: [
        'getting-started',
        {
            type: 'category',
            label: '应用开发',
            items: [
                'app/quick-start',
                'app/component',
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
                'settings/plugins',
            ],
        },
        {
            type: 'category',
            label: '命令行',
            items: [
                'cli/build',
                'cli/dev',
                'cli/lint',
                'cli/test',
            ],
        },
    ],
};
