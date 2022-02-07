import {compact} from '@reskript/core';
import {RuleSetUseItem} from 'webpack';
import {BuildEntry, LoaderType} from '@reskript/settings';
import * as loaders from '../loaders/index.js';

export const introduceLoader = (name: LoaderType, entry: BuildEntry): Promise<RuleSetUseItem | null> => {
    const factory = loaders[name];
    return factory(entry);
};

type MayBeLoaderType = LoaderType | false;

export const introduceLoaders = async (names: MayBeLoaderType[], entry: BuildEntry): Promise<RuleSetUseItem[]> => {
    const items = await Promise.all(compact(names).map(v => introduceLoader(v, entry)));
    return compact(items);
};
