const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        contentScript: path.join(__dirname, 'src/contentScript.ts'),
        backgroundScript: path.join(__dirname, 'src/backgroundScript.ts'),
        options: path.join(__dirname, 'src/options.ts')
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
