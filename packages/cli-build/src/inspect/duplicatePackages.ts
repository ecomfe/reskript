import {StatsCompilation} from 'webpack';
import {compact, flatMap, uniq} from 'lodash';
import matcher from 'matcher';
import {readPackageConfig} from '@reskript/core';
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
const hasMatchInArray = (value: string, array: string[]) => {
    return array.some(pattern => matcher.isMatch(value, pattern));
};

// 以`includes`为优先
const isIncluded = (name: string, includes?: string[], excludes?: string[]): boolean => {
    if (includes) {
        return hasMatchInArray(name, includes);
    }

    if (excludes && hasMatchInArray(name, excludes)) {
        return false;
    }

    return true;
};

const versionOfPackage = async (location: string): Promise<string> => {
    try {
        const packageConfig = await readPackageConfig(location);
        return packageConfig.version;
    }
    catch {
        return 'unknown';
    }
};

const toPackageImportDescription = async (location: string): Promise<string> => {
    const version = await versionOfPackage(location);
    return `      at ${location} (v${version})`;
};

export default (compilations: StatsCompilation[], settings: BuildInspectSettings['duplicatePackages']) => {
    const processor: RuleProcessor<SourceFilter> = {
        config: settings,
        defaultConfigValue: {},
        check: async ({includes, excludes}, {report}) => {
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
                    const locations = await Promise.all([...paths].map(toPackageImportDescription));
                    report(`Found duplicate package ${name}\n${locations.join('\n')}`);
                }
            }
            return true;
        },
    };

    return processor;
};
