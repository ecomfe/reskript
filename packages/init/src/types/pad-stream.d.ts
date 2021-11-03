declare module 'pad-stream' {
    import {Duplex} from 'stream';

    export default function padStream(indent: number, placement: string): Duplex;
}
