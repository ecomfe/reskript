import {BuildCommandLineArgs, ProjectSettings} from '@reskript/settings';
import {BuildContext} from '@reskript/build-utils';

export interface BuildRunOptions<C, S extends ProjectSettings> {
    cmd: BuildCommandLineArgs;
    projectSettings: S;
    buildContextList: Array<BuildContext<C, S>>;
}
