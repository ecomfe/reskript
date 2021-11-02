class Walker {

    currentWord = '';
    currentCase = 'unknown';
    index = 0;
    result = '';

    constructor(source, {resolve}) {
        this.source = source;
        this.len = this.source.length;
        this.resolve = resolve;
    }

    currentCharCase() {
        const code = this.source.charCodeAt(this.index);
        if (code >= 65 && code <= 90) {
            return 'upper';
        }
        else if (code >= 97 && code <= 122) {
            return 'lower';
        }
        else {
            return 'nonword';
        }
    }

    next() {
        this.currentWord += this.source[this.index];
    }

    back() {
        this.currentWord = this.currentWord.slice(0, -1);
        this.index--;
    }

    resolveCurrent() {
        this.result += this.resolve(this.currentWord, this.currentCase);
    }

    clearCurrent() {
        this.currentWord = '';
        this.currentCase = 'unknown';
    }

    createNewWord(wordcase) {
        this.currentWord = this.source[this.index];
        this.currentCase = wordcase;
    }

    upper() {
        switch (this.currentCase) {
            case 'unknown':
                this.createNewWord('uppercase');
                break;
            case 'uppercase':
                this.next();
                break;
            case 'lowercase':
            case 'capital':
                this.resolveCurrent();
                this.createNewWord('uppercase');
        }
    }

    lower() {
        switch (this.currentCase) {
            case 'unknown':
                this.createNewWord('lowercase');
                break;
            case 'lowercase':
            case 'capital':
                this.next();
                break;
            case 'uppercase':
                // 大写到小写时需要后退一个字符，由 uppercase 变为 capital
                this.back();
                if (this.currentWord.length > 0) {
                    this.resolveCurrent();
                }
                this.createNewWord('capital');
        }
    }

    nonword() {
        if (this.currentCase !== 'unknown') {
            this.resolveCurrent();
            this.clearCurrent();
        }
        this.result += this.source[this.index];
    }

    run() {
        while (this.index < this.len) {
            this[this.currentCharCase()]();
            this.index++;
        }
        if (this.currentCase !== 'unknown') {
            this.resolveCurrent();
        }
        return this.result;
    }
}

module.exports = Walker;
