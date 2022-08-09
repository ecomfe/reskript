export const pFilter = <T>(array: T[], callback: (item: T, index: number) => Promise<unknown>) => {
    return array.reduce(
        async (previous, current, index) => {
            const [output, keep] = await Promise.all([previous, callback(current, index)]);
            if (keep) {
                output.push(current);
            }
            return output;
        },
        Promise.resolve([] as T[])
    );
};

export const pReduce = <T, U>(array: T[], callback: (output: U, item: T, index: number) => Promise<U>, initial: U) => {
    return array.reduce(
        async (previous: Promise<U>, item, index) => {
            const output = await previous;
            return callback(output, item, index);
        },
        Promise.resolve(initial)
    );
};

export const pMap = <T, U>(array: T[], callback: (item: T, index: number) => Promise<U>) => {
    return Promise.all(array.map(callback));
};
