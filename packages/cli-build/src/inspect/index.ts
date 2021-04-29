import {Stats} from 'webpack';
import {BuildInspectSettings} from '@reskript/settings';
import {run, InspectOptions} from './utils';
import initialResources from './initialResources';
import duplicatePackages from './duplicatePackages';

export default (stats: Stats, settings: BuildInspectSettings, options: InspectOptions) => {
    const {children = []} = stats.toJson('normal');
    const processors = [
        ...initialResources(children, settings.initialResources),
        duplicatePackages(children, settings.duplicatePackages),
    ];
    run(processors, options);
};

