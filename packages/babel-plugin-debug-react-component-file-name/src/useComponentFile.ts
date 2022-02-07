import {useDebugValue, useRef} from 'react';

export default function useComponentFile(displayValue: string, fullValue: string) {
    useDebugValue(displayValue);
    useRef(fullValue.replace(/:origin/g, location.origin));
}
