import {Stats} from 'webpack';
import {BuildInspectSettings} from '@reskript/settings';
import {run, InspectOptions} from './utils.js';
import initialResources from './initialResources.js';
import duplicatePackages from './duplicatePackages.js';
import htmlImportable from './htmlImportable.js';

export default async (stats: Stats, settings: BuildInspectSettings, options: InspectOptions) => {
    const {children = []} = stats.toJson('normal');
    const processors = [
        ...initialResources(children, settings.initialResources),
        duplicatePackages(children, settings.duplicatePackages),
        htmlImportable(children, settings.htmlImportable),
    ];
    await run(processors, options);
};

