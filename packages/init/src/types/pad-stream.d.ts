declare module 'pad-stream' {
    import {Duplex} from 'node:stream';

    export default function padStream(indent: number, placement: string): Duplex;
}
