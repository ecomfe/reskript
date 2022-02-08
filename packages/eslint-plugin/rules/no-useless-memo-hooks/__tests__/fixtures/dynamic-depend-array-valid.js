const options = {}
const memoizedOptions = useMemo(
    () => options,
    Object.values(options)
);