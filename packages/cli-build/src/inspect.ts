import {Stats, StatsCompilation} from 'webpack';
import {flatMap, uniqBy, sumBy} from 'lodash';
import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';
import {BuildInspectSettings, RuleConfig, Severity} from '@reskript/settings';

const SEVERITY_PREFIX: Record<Severity, string> = {
    'off': '   ',
    'print': chalk.bgWhite.black(' I '),
    'warning': chalk.bgYellow.white(' W '),
    'error': chalk.bgRed.white(' E '),
};

const print = (config: RuleConfig<any>, message: string) => {
    const severity = typeof config === 'string' ? config : config[0];
    console.log(`${SEVERITY_PREFIX[severity]} ${message}`);
};

const extractInitialChunks = (stats: Stats) => {
    const {children = []} = stats.toJson('normal');
    const chunks = uniqBy(flatMap(children, child => child.chunks ?? []), chunk => chunk.id);
    const initialChunks = chunks.filter(chunk => chunk.initial);
    return initialChunks;
};

const isRequired = (rule: RuleConfig<any>): boolean => rule !== 'off' && rule[0] !== 'off';

const isRequiredWithConfig = <T>(rule: RuleConfig<T>): rule is [Severity, T] => {
    if (typeof rule === 'string') {
        return false;
    }

    return rule[0] !== 'off';
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

    return flatMap(imports, matchImportInChunks);
};


export default (stats: Stats, settings: BuildInspectSettings) => {
    const initialChunks = extractInitialChunks(stats);
    const results: Severity[] = [];

    if (isRequired(settings.initialResources.count)) {
        print(
            settings.initialResources.count,
            `Initial resource count: ${initialChunks.length}`
        );
    }
    if (isRequired(settings.initialResources.totalSize)) {
        print(
            settings.initialResources.totalSize,
            `Initial resource size: ${prettyBytes(sumBy(initialChunks, chunk => chunk.size))} (not gzipped)`
        );
    }
    if (isRequiredWithConfig(settings.initialResources.disallowImports)) {
        const [severity, config] = settings.initialResources.disallowImports;
        const unwantedChunkImports = findDisallowedImportsInChunks(initialChunks, config);
        if (unwantedChunkImports.length) {
            for (const {file, moduleName} of unwantedChunkImports) {
                print(
                    settings.initialResources.disallowImports,
                    `Initial chunk ${file} includes disallowed module ${moduleName}`
                );
            }
        }
        results.push(severity);
    }

    if (results.includes('error')) {
        process.exit(10);
    }
};
