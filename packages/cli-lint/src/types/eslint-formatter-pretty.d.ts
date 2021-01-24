/* eslint-disable */
declare module 'eslint-formatter-pretty' {
    import {ESLint} from 'eslint';

    const format: typeof ESLint.Formatter.format;

    export default format;
}
