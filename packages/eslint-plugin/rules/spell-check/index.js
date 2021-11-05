const typos = require('./typos');
const Walker = require('./walker');
const {capitalizeFirstLetter} = require('../../utils');

const reportMisspelling = (context, node, expect) => {
    const {name: actual} = node;
    context.report({
        node,
        message: `'${actual}' may be a typo for '${expect}'`,
        fix(fixer) {
            return fixer.replaceText(node, expect);
        },
    });
};

const getCorrectSpelling = (word, type) => {
    const correct = typos[word];
    switch (type) {
        case 'capital':
            return capitalizeFirstLetter(correct);
        case 'uppercase':
            return correct.toUpperCase();
        default:
            return correct;
    }
};

const checkNameSpelling = (context, node) => {
    const {name} = node;
    // 这里考虑到这个规则的处理量非常大，用个boolean来记录是否拼写错误，比较性能更高一些
    let hasTypo = false;
    const check = (word, type) => {
        const spelling = word.toLowerCase();
        if (!typos.hasOwnProperty(spelling)) {
            return word;
        }
        hasTypo = true;
        return getCorrectSpelling(spelling, type);
    };

    const walker = new Walker(name, {resolve: check});
    const expect = walker.run();

    if (hasTypo) {
        reportMisspelling(context, node, expect);
    }
};


module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prevent common typos',
            recommended: true,
        },
        fixable: 'code',
    },

    create(context) {
        return {
            Identifier(node) {
                checkNameSpelling(context, node);
            },
        };
    },
};
