import replace from './replace.js';

export default function lessSafeLoader(this: any, source: string) {
    this.cacheable();
    return replace(source);
}
