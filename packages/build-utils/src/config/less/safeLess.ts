const CALC_EXPRESSION_START = 'calc(';
const CALC_EXPRESSION_END = ')';

const findMatchedEndBracketIndex = (source: string, start: number, skip: number = 0): number => {
    const nextStartBracketIndex = source.indexOf('(', start);
    const nextEndBracketIndex = source.indexOf(')', start);

    if (nextEndBracketIndex < 0) {
        return -1;
    }

    // 如果在`)`前有遇到另一个`(`，说明有嵌套的括号，此时要求下一个迭代跳过一次`)`
    if (nextStartBracketIndex >= 0 && nextStartBracketIndex < nextEndBracketIndex) {
        return findMatchedEndBracketIndex(source, nextStartBracketIndex + 1, skip + 1);
    }

    // 如果已经不需要再跳过`)`了，可以直接认为当前找到的`)`的位置就是准确的
    return skip ? findMatchedEndBracketIndex(source, nextEndBracketIndex + 1, skip - 1) : nextEndBracketIndex;
};

const replaceCalcCallExpression = (expression: string) => {
    const calcBody = expression.slice(CALC_EXPRESSION_START.length, -CALC_EXPRESSION_END.length);
    const innerBracketMatch = /^~['"](.+)['"]$/.exec(calcBody);
    const bareBody = innerBracketMatch ? innerBracketMatch[1] : calcBody;
    const varUsageReplacedBody = bareBody.replace(
        /@([a-zA-Z0-9-]+)/g,
        '@{$1}'
    );
    return '~\'' + CALC_EXPRESSION_START + varUsageReplacedBody + CALC_EXPRESSION_END + '\'';
};

// 这个处理肯定不是完美的，比如`content: "calc(xxx)"`也会被替换，不过我相信没人这么干，本着不被发现就不算BUG的原则，暂时无视
const replaceCalcExpressions = (source: string, start: number = 0): string => {
    const expressionStartIndex = source.indexOf(CALC_EXPRESSION_START, start);

    if (expressionStartIndex < 0) {
        return source;
    }

    const expressionBodyStartIndex = expressionStartIndex + CALC_EXPRESSION_START.length;
    const leadingCharacter = source[expressionStartIndex - 1];

    // 我们要求前面是一个空白字符（空格、换行等）或者冒号，这个`calc`才是真正的函数调用要被替换的，其它情况就不替换直接进下一轮查找
    if (!/[\s:]/.test(leadingCharacter)) {
        return replaceCalcExpressions(source, expressionBodyStartIndex);
    }

    const endBracketIndex = findMatchedEndBracketIndex(source, expressionBodyStartIndex);

    // 如果没有配对的`)`结束，那也没办法做替换，可能是语法错，也可能是个注释啥的，不管它
    if (endBracketIndex < 0) {
        return source;
    }

    const expressionEndIndex = endBracketIndex + 1;
    const calcExpression = source.slice(expressionStartIndex, expressionEndIndex);
    const newExpression = replaceCalcCallExpression(calcExpression);
    const replacedSource = source.slice(0, expressionStartIndex) + newExpression + source.slice(expressionEndIndex);
    return replaceCalcExpressions(replacedSource, expressionEndIndex);
};

export const safeLess = (source: string) => replaceCalcExpressions(source);
