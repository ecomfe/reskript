import {compact} from '@reskript/core';
import {RuleSetUseItem} from 'webpack';
import {BuildEntry, LoaderType} from '@reskript/settings';
import * as loaders from '../loaders/index.js';

export const introduceLoader = (name: LoaderType, entry: BuildEntry): RuleSetUseItem | null => {
    const factory = loaders[name];
    return factory(entry);
};

export const introduceLoaders = (names: Array<LoaderType | false>, entry: BuildEntry): RuleSetUseItem[] => {
    return compact(compact(names).map(v => introduceLoader(v, entry)));
};
