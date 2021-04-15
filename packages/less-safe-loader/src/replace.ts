export default (source: string) => source.replace(
    /calc\([^)]+\)/g,
    (expression, index) => {
        const leading = source[index - 1];

        // 针对`~'calc(xxx)'`这样的形态，就不用替换了
        if (leading === '\'' || leading === '"') {
            return expression;
        }

        const varUsageReplace = expression.replace(
            /@([a-zA-Z0-9-]+)/g,
            '@{$1}'
        );
        return `~'${varUsageReplace}'`;
    }
);
