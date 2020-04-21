const { compilerOptions } = require('./tsconfig.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')

const developmentCommon = {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
}

const frontend = {
    name: 'frontend',
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
            use: [{
                loader: 'ts-loader',
                options: {
                    compilerOptions
                }
            }]
        }, {
            test: /.html$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].html'
                }
            }]
        }, {
            test: /assets\//,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }]
        }]
    }
}

const server = {
    name: 'server',
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
