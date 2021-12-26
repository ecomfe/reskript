import path from 'path';
import fs from 'fs/promises';
import {uniq, last, reject, isNil} from 'ramda';
import {StatsCompilation} from 'webpack';
import {BuildInspectSettings, SourceFilter} from '@reskript/settings';
import {RuleProcessor, isIncluded} from './utils.js';

const extractScriptEntries = (compilations: StatsCompilation[]): string[] => {
    const entries = compilations.flatMap(c => Object.values(c.entrypoints ?? {}));
    // 这里的`assets`是有顺序的（大概），被别人依赖的在前面（大概），真正的入口是最后一个（大概）
    return uniq(reject(isNil, entries.map(v => last(v.assets ?? [])?.name)));
};

const extractHTMLEntries = (compilations: StatsCompilation[]): string[] => {
    const assets = compilations.flatMap(c => c.assets ?? []);
    const files = assets.filter(v => /^\.\.\/.+\.html$/.test(v.name)).map(v => v.name);
    return files;
};

const checkHtml = async (file: string, allowedScripts: string[], report: (message: string) => void, cwd: string) => {
    const content = await fs.readFile(path.join(cwd, 'dist', 'assets', file), 'utf-8');
    const lastScript = [...content.matchAll(/<script.+src="(.+)">/g)].pop();

    if (!lastScript) {
        return true;
    }

    const src = lastScript[1];
    if (allowedScripts.some(v => src.includes(v))) {
        return true;
    }

    const message = `The last script in ${file.replace(/^\.\.\//, '')} doesn't reference to an entry script, `
        + 'this can break micro-frontend frameworks like qiankun';
    report(message);
};

export default (compilations: StatsCompilation[], settings: BuildInspectSettings['htmlImportable']) => {
    const processor: RuleProcessor<SourceFilter> = {
        config: settings,
        defaultConfigValue: {},
        check: async ({includes, excludes}, {report}, {cwd}) => {
            const entryScripts = extractScriptEntries(compilations);
            const htmlFiles = extractHTMLEntries(compilations).filter(v => isIncluded(v, includes, excludes));
            const results = await Promise.all(htmlFiles.map(v => checkHtml(v, entryScripts, report, cwd)));
            return results.every(v => v);
        },
    };

    return processor;
};
