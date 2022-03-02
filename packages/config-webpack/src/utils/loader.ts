import {compact} from '@reskript/core';
import {RuleSetUseItem} from 'webpack';
import {WebpackBuildEntry, LoaderType} from '@reskript/settings';
import * as loaders from '../loaders/index.js';

export const introduceLoader = (name: LoaderType, entry: WebpackBuildEntry): Promise<RuleSetUseItem | null> => {
    const factory = loaders[name];
    return factory(entry);
};

type MayBeLoader = LoaderType | false;

export const introduceLoaders = async (names: MayBeLoader[], entry: WebpackBuildEntry): Promise<RuleSetUseItem[]> => {
    const items = await Promise.all(compact(names).map(v => introduceLoader(v, entry)));
    return compact(items);
};
