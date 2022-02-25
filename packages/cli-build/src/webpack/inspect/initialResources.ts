import {StatsCompilation} from 'webpack';
import {uniqBy, sum, mean} from 'ramda';
// @ts-expect-error
import prettyBytes from 'pretty-bytes';
import {BuildInspectInitialResource} from '@reskript/settings';
import {RuleProcessor} from './utils.js';

const extractInitialChunks = (compilations: StatsCompilation[]) => {
    const chunks = uniqBy(chunk => chunk.id, compilations.flatMap(child => child.chunks ?? []));
    const initialChunks = chunks.filter(chunk => chunk.initial);
    return initialChunks;
};

type StatsChunk = Exclude<StatsCompilation['chunks'], undefined>[0];

const findDisallowedImportsInChunks = (chunks: StatsChunk[], imports: string[]) => {
    const matchImportInChunks = (disallowed: string) => {
        const match = `node_modules/${disallowed}/`;
        const matchedChunks = chunks.filter(chunk => chunk.modules?.some(m => m.nameForCondition?.includes(match)));
        const toChunkMatch = (chunk: StatsChunk) => {
            const file = chunk.files?.[0] ?? '(unknown)';
            return {
                file,
                moduleName: disallowed,
            };
        };
        return matchedChunks.map(toChunkMatch);
    };

    return imports.flatMap(matchImportInChunks);
};

export default (compilations: StatsCompilation[], settings: BuildInspectInitialResource) => {
    const initialChunks = extractInitialChunks(compilations);

    const count: RuleProcessor<number> = {
        config: settings.count,
        defaultConfigValue: Infinity,
        check: async (max, {notice, report}) => {
            notice(`Initial resource count: ${initialChunks.length}`);
            if (initialChunks.length > max) {
                report(`Too many initial resoures, max allowed is ${max}`);
            }
            return initialChunks.length <= max;
        },
    };
    const totalSize: RuleProcessor<number> = {
        config: settings.totalSize,
        defaultConfigValue: Infinity,
        check: async (max, {notice, report}) => {
            const totalSize = sum(initialChunks.map(chunk => chunk.size));
            notice(`Initial resource size: ${prettyBytes(totalSize)} (not gzipped)`);
            if (totalSize > max) {
                report(`Initial size is too large, max allowed is is ${prettyBytes(max)}`);
            }
            return totalSize <= max;
        },
    };
    const sizeDeviation: RuleProcessor<number> = {
        config: settings.sizeDeviation,
        defaultConfigValue: Infinity,
        check: async (max, {report}) => {
            const average = mean(initialChunks.map(chunk => chunk.size));
            const abnormalChunks = initialChunks.filter(chunk => (chunk.size - average) / average > max);
            for (const chunk of abnormalChunks) {
                report(`Resource ${chunk.files?.[0]} has unbalanced size to other resources`);
            }
            return !abnormalChunks.length;
        },
    };
    const disallowImports: RuleProcessor<string[]> = {
        config: settings.disallowImports,
        defaultConfigValue: [],
        check: async (disallowImports, {report}) => {
            const unwantedChunkImports = findDisallowedImportsInChunks(initialChunks, disallowImports);
            for (const {file, moduleName} of unwantedChunkImports) {
                report(`Initial chunk ${file} includes disallowed module ${moduleName}`);
            }
            return !unwantedChunkImports.length;
        },
    };

    return [count, totalSize, sizeDeviation, disallowImports];
};
