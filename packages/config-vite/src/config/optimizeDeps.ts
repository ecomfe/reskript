import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import compat from 'core-js-compat';
import {ConfigFactory} from '../interface.js';

const readBrowsersListQuery = (cwd: string) => {
    const file = path.join(cwd, '.browserslistrc');
    return existsSync(file) ? fs.readFile(file, 'utf8') : 'defaults';
};

const readCoreJsVersion = async (cwd: string) => {
    const file = path.join(cwd, 'node_modules', 'core-js', 'package.json');
    const content = await fs.readFile(file, 'utf-8');
    const {version} = JSON.parse(content);
    return version;
};

const resolveCoreJsModules = async (cwd: string, required: boolean) => {
    if (!required) {
        return [];
    }

    const [query, coreJsVersion] = await Promise.all([readBrowsersListQuery(cwd), readCoreJsVersion(cwd)]);
    const {list} = compat({targets: query, version: coreJsVersion});
    return list.map(v => `core-js/modules/${v}`);
};

const resolveAntdModules = async (cwd: string, required: boolean) => {
    if (!required) {
        return [];
    }

    // 反正也没办法知道到底用了`antd`的啥东西，只能全弄进来，虽然会挺慢的
    try {
        const files = await fs.readdir(path.join(cwd, 'node_modules', 'antd', 'es'));
        return files.filter(v => v !== 'locale' && v !== 'style')
            .filter(v => /^[a-z-]+$/.test(v))
            .flatMap(v => ['antd/es/' + v, 'antd/es/' + v + '/style']);
    }
    catch {
        return [];
    }
};

const factory: ConfigFactory = async context => {
    const {uses, script: {polyfill}} = context.projectSettings.build;
    const resolvingDeps = [
        resolveCoreJsModules(context.cwd, polyfill),
        resolveAntdModules(context.cwd, uses.includes('antd')),
    ];
    const [coreJsModules, antdModules] = await Promise.all(resolvingDeps);

    return {
        optimizeDeps: {
            entries: [
                'src/entries/*',
                'src/entries/*/index.*',
            ],
            include: [
                ...coreJsModules,
                ...antdModules,
            ],
            // 因为`antd`被拆开了，所以一但用户说自己用`antd`，那就不需要整个去预处理了，哪怕从`entries`源码里扫出来也不要处理
            exclude: uses.includes('antd') ? ['antd'] : [],
        },
        debug: true,
    };
};

export default factory;
