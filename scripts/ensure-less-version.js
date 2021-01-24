const fs = require('fs');

const content = fs.readFileSync('./packages/config-webpack/package.json');
if (content.includes('"less": "3.9.0"')) {
    console.log('Successfully checked less version');
}
else {
    console.error('Should keep less at 3.9.0 until https://github.com/less/less.js/issues/3434 is resolved');
    process.exit(3);
}
