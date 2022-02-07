import {StatsCompilation} from 'webpack';
import {uniq, reject, isNil} from 'ramda';
import {readPackageConfig} from '@reskript/core';
import {BuildInspectSettings, SourceFilter} from '@reskript/settings';
import {RuleProcessor, isIncluded} from './utils.js';

const extractUniqueModules = (compilations: StatsCompilation[]): string[] => {
    const modules = compilations.flatMap(c => c.modules);
    const names = modules.map(m => m?.nameForCondition);
    return uniq(reject(isNil, names));
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
            const occurrences = names.reduce(
                (occurrences, current) => {
                    const info = parseName(current);

                    if (!info) {
                        return occurrences;
                    }

                    if (occurrences.has(info.name)) {
                        occurrences.get(info.name)!.add(info.path);
                    }
                    else {
                        occurrences.set(info.name, new Set([info.path]));
                    }
                    return occurrences;
                },
                new Map<string, Set<string>>()
            );
            for (const [name, paths] of occurrences.entries()) {
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
