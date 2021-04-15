import replace from './replace';

export default function lessSafeLoader(this: any, source: string) {
    this.cacheable();
    return replace(source);
}
