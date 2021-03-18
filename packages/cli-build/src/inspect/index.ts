import {Stats} from 'webpack';
import {BuildInspectSettings} from '@reskript/settings';
import {run} from './utils';
import initialResources from './initialResources';


export default (stats: Stats, settings: BuildInspectSettings) => {
    const {children = []} = stats.toJson('normal');
    const processors = [
        ...initialResources(children, settings.initialResources),
    ];
    run(processors);
};

