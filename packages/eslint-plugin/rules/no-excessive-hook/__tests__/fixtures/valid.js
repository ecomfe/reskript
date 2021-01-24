import {useNative, Namespace, test} from 'mock-use';

const useFoo = () => {
    useNative();
};

function useBar() {
    useNative();
    test();
}

const useZoo = function () {
    Namespace.useNative();
};
