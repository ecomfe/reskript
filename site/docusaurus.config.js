module.exports = {
    title: 'reSKRipt',
    tagline: '基于React与Ant Design的应用开发命令行工具套件',
    baseUrl: process.env.CI ? '/reskript/' : '/',
    favicon: 'favicon.ico',
    url: 'https://ecomfe.github.io/reskript',
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
                    to: 'https://github.com/ecomfe/reskript',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
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
