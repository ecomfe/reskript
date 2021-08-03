const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = (options = {}) => {
    const compiler = webpack({
        mode: 'development',
        devtool: false,
        context: __dirname,
        entry: './fixtures/icon-test.svg',
        output: {
            path: path.join(__dirname, 'output'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    resourceQuery: /^\?asset$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.svg$/,
                    resourceQuery: {
                        not: /^\?asset$/,
                    },
                    use: {
                        loader: require.resolve('../index.ts'),
                        options,
                    },
                },
            ],
        },
        externals: {
            react: 'React',
        },
        optimization: {
            splitChunks: false,
            minimize: false,
            usedExports: false,
        },
    });

    fs.rmSync(path.join(__dirname, 'output'), {recursive: true, force: true});

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            const output = stats.toJson({source: true, errors: true});
            if (stats.hasErrors()) {
                const error = output.errors[0];
                reject(new Error(error.message || error));
            }
            else {
                resolve(output.modules[0].source);
            }
        });
    });
};
