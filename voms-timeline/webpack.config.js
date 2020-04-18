const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const developmentCommon = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}

const frontend = {
    entry: './src/front/app.tsx',
    output: {
        filename: 'app.js',
        path: __dirname + '/dist/front'
    },
    module: {
        rules: [{
            test: /.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /.(tsx|.ts)$/,
            use: [ 'ts-loader' ]
        }, {
            test: /.html$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].html'
                }
            }]
        }]
    }
}

const server = {
    target: 'node',
    node: {
        __dirname: false
    },
    entry: './src/server/app.ts',
    output: {
        filename: 'app.js',
        path: __dirname + '/dist/server'
    },
    module: {
        rules: [{
            test: /.ts$/,
            use: [ 'ts-loader' ]
        }]
    }
}

module.exports = [{
    ...developmentCommon,
    ...frontend
}, {
    ...developmentCommon,
    ...server
}]
