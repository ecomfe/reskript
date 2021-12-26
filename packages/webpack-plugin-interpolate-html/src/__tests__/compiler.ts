import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import InteroplateHTMLPlugin from '../index.js';

export default (replacements: Record<string, string>) => {
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
            new HTMLWebpackPlugin({template: path.join(__dirname, 'fixtures', 'index.html')}),
            new InteroplateHTMLPlugin(replacements),
        ],
    });

    return new Promise<string>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            if (!stats) {
                reject(new Error('No stats'));
                return;
            }

            const result = stats.toJson();

            if (stats.hasErrors()) {
                reject(new Error(result?.errors?.[0].message ?? 'Unknown error'));
            }

            const output = fs.readFileSync(path.join(__dirname, 'output', 'index.html'), 'utf-8');
            resolve(output);
        });
    });
};
