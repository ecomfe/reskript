import fs from 'fs/promises';
// @ts-expect-error
import dedent from 'dedent';
import {Options, TemplateConfig, PlaceholderConfig} from './interface.js';

const DEFAULT_BACKGROUND_COLOR = '#f5f5f5';

const placeholderStyle = (config?: PlaceholderConfig | number): PlaceholderConfig => {
    if (!config) {
        return {
            size: 0,
            backgroundColor: DEFAULT_BACKGROUND_COLOR,
        };
    }

    if (typeof config === 'number') {
        return {
            size: config,
            backgroundColor: DEFAULT_BACKGROUND_COLOR,
        };
    }

    return config;
};

const defaultTemplate = (appName: string, config?: TemplateConfig) => {
    const header = placeholderStyle(config?.header);
    const sidebarLeft = placeholderStyle(config?.sidebarLeft);
    const footer = placeholderStyle(config?.footer);

    return dedent`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${appName} - Qiankun</title>
            <style>
            body {
                margin: 0;
            }
            #header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: ${header.size}px;
                background-color: ${header.backgroundColor};
            }
            #content {
                padding-top: ${header.size}px;
                display: flex;
            }
            #sidebar-left {
                width: ${sidebarLeft.size}px;
                background-color: ${sidebarLeft.backgroundColor};
                min-height: calc(100vh - ${header.size}px);
            }
            #apps {
                flex: 1;
                overflow: hidden;
            }
            #footer {
                height: ${footer.size}px;
                background-color: ${footer.backgroundColor};
            }
            </style>
        </head>
        <body>
            <header id="header"></header>
            <div id="content">
                <aside id="sidebar-left"></aside>
                <main id="apps"></main>
            </div>
            <footer id="footer"></footer>
            <script src="/__qiankun_entry__.js"></script>
        </body>
        </html>
    `;
};

const injectEntryScript = (html: string) => {
    const lines = html.split('\n');
    // 如果找得到`</body>`的话就把脚本注入到它前面，没有的话就放最后一行了
    const bodyEndTagLineIndex = lines.findIndex(c => c.includes('</body>'));
    // 尽量和`</body>`这一行的前置空格数量对齐，长得好看些
    const [leadingWhiteSpaces] = /^ */.exec((lines[bodyEndTagLineIndex] || '')) ?? [''];
    lines.splice(
        bodyEndTagLineIndex < 0 ? lines.length : bodyEndTagLineIndex,
        0,
        leadingWhiteSpaces + '<script src="/__qiankun_entry__.js"></script>'
    );
    return lines.join('\n');
};

const customTemplate = async (appName: string, template: string) => {
    if (template.startsWith('/')) {
        const templateContent = await fs.readFile(template, 'utf-8');
        const appNameInjected = templateContent.replace(/\{appName\}/g, appName);
        return injectEntryScript(appNameInjected);
    }
    return injectEntryScript(template);
};

export default async (appName: string, {template}: Options = {}) => {
    return typeof template === 'string' ? customTemplate(appName, template) : defaultTemplate(appName, template);
};
