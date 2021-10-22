import {GitStatusItem} from 'g-status';

const isPresent = (item: GitStatusItem) => item.index !== 'D' && item.workingTree !== 'D';

const isStaged = (item: GitStatusItem) => isPresent(item) && item.index !== '?' && item.index !== ' ';

const isStagedOnly = (item: GitStatusItem) => isStaged(item) && item.workingTree === ' ';

export const filterChanged = (items: GitStatusItem[]) => items.filter(isPresent);

export const filterStaged = (items: GitStatusItem[]) => items.filter(isStaged);

export const filterStagedOnly = (items: GitStatusItem[]) => items.filter(isStagedOnly);

export const extractName = (item: GitStatusItem) => {
    const name = (item.index === 'R' || item.index === 'C') ? item.path.split('->')[1].trim() : item.path;
    return (name.startsWith('"') && name.endsWith('"')) ? name.slice(1, -1) : name;
};
