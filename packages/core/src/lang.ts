type HasValue<T> = Exclude<T, null | undefined | false | '' | 0>;

export const compact = <T>(values: T[]): Array<HasValue<T>> => {
    const excludeFalsy = (value: T): value is HasValue<T> => !!value;
    return values.filter(excludeFalsy);
};
