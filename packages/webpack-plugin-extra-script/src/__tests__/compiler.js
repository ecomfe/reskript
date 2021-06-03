import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ExtraScriptPlugin from '../index';

module.exports = (scriptOrFactory, options) => {
    const compiler = webpack({
        devtool: false,
        mode: 'development',
        context: __dirname,
        entry: './fixtures/index.js',
        output: {
            path: path.join(__dirname, 'output'),
            filename: 'bundle.js',
        },
        plugins: [
            new HTMLWebpackPlugin(),
            new ExtraScriptPlugin(scriptOrFactory, options),
        ],
    });

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            }

            const result = stats.toJson();

            if (stats.hasErrors()) {
                reject(new Error(result.errors[0].message));
            }

            const output = fs.readFileSync(path.join(__dirname, 'output', 'index.html'), 'utf-8');
            resolve(output);
        });
    });
};
