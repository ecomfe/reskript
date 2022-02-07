import {uniq} from 'ramda';
import status from 'g-status';
import {filterChanged, filterStaged, filterStagedOnly, extractName} from './utils.js';

export interface GitStatusResult {
    modified: string[];
    staged: string[];
    stagedOnly: string[];
}

export const gitStatus = async (cwd: string): Promise<GitStatusResult> => {
    try {
        const items = await status({cwd});
        return {
            modified: uniq(filterChanged(items).map(extractName)),
            staged: uniq(filterStaged(items).map(extractName)),
            stagedOnly: uniq(filterStagedOnly(items).map(extractName)),
        };
    }
    catch {
        return {
            modified: [],
            staged: [],
            stagedOnly: [],
        };
    }
};
