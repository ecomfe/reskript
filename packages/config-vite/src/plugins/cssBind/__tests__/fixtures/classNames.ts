function classNames(value: string) {
    return `internal-class-${value}`;
}

classNames.bind = (value: string) => value;

export default classNames;
