import path from 'node:path';
import {existsSync} from 'node:fs';
import fs from 'node:fs/promises';
import compat from 'core-js-compat';
import {resolveDependencyVersion} from '@reskript/core';
import {ConfigFactory} from '../interface.js';

const readBrowsersListQuery = async (cwd: string) => {
    const file = path.join(cwd, '.browserslistrc');
    if (existsSync(file)) {
        const content = await fs.readFile(file, 'utf8');
        return content.trim().split('\n');
    }

    return ['defaults'];
};

const readCoreJsVersion = async (cwd: string) => {
    const version = await resolveDependencyVersion('core-js', cwd);

    if (!version) {
        throw new Error('core-js not installed');
    }

    return version;
};

const resolveCoreJsModules = async (cwd: string, required: boolean) => {
    if (!required) {
        return [];
    }

    const [query, coreJsVersion] = await Promise.all([readBrowsersListQuery(cwd), readCoreJsVersion(cwd)]);
    const {list} = compat({targets: query, version: coreJsVersion});
    return list.map(v => `core-js/modules/${v}.js`);
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
        resolveAntdModules(context.cwd, uses.includes('antd@4')),
    ];
    const [coreJsModules, antdModules] = await Promise.all(resolvingDeps);
    const emotionModules = uses.includes('emotion') ? ['@emotion/styled/base'] : [];

    return {
        optimizeDeps: {
            entries: [
                'src/entries/*',
                'src/entries/*/index.*',
            ],
            include: [
                'react',
                'react/jsx-runtime',
                ...coreJsModules,
                ...antdModules,
                ...emotionModules,
            ],
            // 因为`antd`被拆开了，所以一但用户说自己用`antd`，那就不需要整个去预处理了，哪怕从`entries`源码里扫出来也不要处理
            exclude: uses.includes('antd@4') ? ['antd'] : [],
        },
        debug: true,
    };
};

export default factory;
