import {useNative} from 'mock-use';

const useFoo = value => {
    if (value > 0) {
        useNative();
    }
};
