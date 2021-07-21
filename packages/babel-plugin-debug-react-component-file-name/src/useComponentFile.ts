import {useDebugValue, useRef} from 'react';

export default function useComponentFile(filename: string) {
    useDebugValue(filename);
    useRef(filename);
}
