module.exports = {
    title: 'reSKRipt',
    tagline: '基于React与Ant Design的应用开发命令行工具套件',
    baseUrl: process.env.BASE_URL || '/',
    favicon: 'favicon.ico',
    url: 'https://reskript.vercel.app',
    themeConfig: {
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
        },
        navbar: {
            logo: {
                alt: '',
                src: 'images/logo.svg',
            },
            items: [
                {
                    to: 'docs/getting-started',
                    activeBasePath: 'docs',
                    label: '文档',
                    position: 'left',
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    to: 'https://github.com/ecomfe/reskript',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
        },
        algolia: {
            appId: 'K8JP6PZOFP',
            apiKey: 'c423c99a4836f7af2ba8cd2cf0733bb6',
            indexName: 'reskript',
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                },
            },
        ],
    ],
};
