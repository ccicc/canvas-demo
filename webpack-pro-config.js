/**
 * 
 * 
 * webpack生产配置
 * 
 * */ 


const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

// webpack插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 入口文件
const entries = function() {
    const pageDir = path.resolve(__dirname, './src/pages');
    const entryFiles = glob.sync(`${pageDir}/**/*.js`);
    const entryConfig = {};

    entryFiles.forEach(filePath => {
        const fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        entryConfig[fileName] = filePath;
    });

    return entryConfig;
};

// 模板文件
const htmlPages = function() {
    const pageDir = path.resolve(__dirname, './src/pages');
    const templateFiles = glob.sync(`${pageDir}/**/*.html`);
    const configHtmlPlugins = [];

    templateFiles.forEach(item => {
        const pageName = item.substring(item.lastIndexOf('\/') + 1, item.lastIndexOf('.'));
        const htmlPlugin = new HtmlWebpackPlugin({
            title: pageName,
            template: item,
            filename: `${pageName}.html`,
            inject: 'body',
            hash: true,
            chunks: [pageName],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        });
        configHtmlPlugins.push(htmlPlugin);
    });

    return configHtmlPlugins;
};

module.exports = {
    devtool: 'cheap-source-map',

    entry: entries(),

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '',
        chunkFilename: '[id].bundle.js',
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                use: [
                    {loader: 'babel-loader', options: {cacheDirectory: true}},
                    {loader: 'eslint-loader'},
                ],
                include: path.resolve(__dirname, './src/pages'),
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {
                            sourceMap: true,
                            minimize: true
                        }},
                        {loader: 'sass-loader'},
                        {loader: 'postcss-loader', options: {
                            config: {path: path.resolve(__dirname, './postcss.config.js')}
                        }},
                    ]
                }),
                include: path.resolve(__dirname, './src/pages'),
            },

            {
                test: /\.(img|jpg|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]?[hash:base64:5]'
                        }
                    }
                ],
                include: path.resolve(__dirname, './src/images'),
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            composser: {
                warnings: true,
            }
        }),
        new ExtractTextPlugin({
            filename: 'style/[name].css'
        }),
        ...htmlPages(),
    ],

    resolve: {
        extensions: ['.js', '.scss', '.css', '.json', '*']
    }
}