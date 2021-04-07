import {StatsCompilation} from 'webpack';
import {compact, flatMap, uniq} from 'lodash';
import {BuildInspectSettings, SourceFilter} from '@reskript/settings';
import {RuleProcessor} from './utils';

const extractUniqueModules = (compilations: StatsCompilation[]): string[] => {
    const modules = flatMap(compilations, c => c.modules);
    const names = modules.map(m => m?.nameForCondition);
    return uniq(compact(names));
};

interface LibraryInfo {
    name: string;
    path: string;
}

const parseName = (name: string): LibraryInfo | null => {
    const lastIndex = name.lastIndexOf('node_modules/');

    if (lastIndex < 0) {
        return null;
    }

    const pathPrefix = name.slice(0, lastIndex + 'node_modules/'.length);
    const segments = name.slice(pathPrefix.length).split('/');
    const packageName = segments[0].startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0];
    return {
        name: packageName,
        path: pathPrefix + packageName,
    };
};

// 以`includes`为优先
const isIncluded = (name: string, includes?: string[], excludes?: string[]): boolean => {
    if (includes) {
        return includes.includes(name);
    }

    if (excludes && excludes.includes(name)) {
        return false;
    }

    return true;
};

export default (compilations: StatsCompilation[], settings: BuildInspectSettings['duplicatePackages']) => {
    const processor: RuleProcessor<SourceFilter> = {
        config: settings,
        defaultConfigValue: {},
        check: ({includes, excludes}, {report}) => {
            const names = extractUniqueModules(compilations);
            const occurences = names.reduce(
                (occurences, current) => {
                    const info = parseName(current);

                    if (!info) {
                        return occurences;
                    }

                    if (occurences.has(info.name)) {
                        occurences.get(info.name)!.add(info.path);
                    }
                    else {
                        occurences.set(info.name, new Set([info.path]));
                    }
                    return occurences;
                },
                new Map<string, Set<string>>()
            );
            for (const [name, paths] of occurences.entries()) {
                if (paths.size > 1 && isIncluded(name, includes, excludes)) {
                    const locations = [...paths].map(s => `      at ${s}`);
                    report(`Found duplicate package ${name}\n${locations.join('\n')}`);
                }
            }
            return true;
        },
    };

    return processor;
};
