/**
 * 
 * 
 * webpack开发配置
 * 
 */ 

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

//webpack插件
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
            chunks: [pageName],
            hash: true
        });
        configHtmlPlugins.push(htmlPlugin);
    });

    return configHtmlPlugins;
};


module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: entries(),

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        filename: 'js/[name].bundle.js',
        chunkFilename: '[id].bundle.js',
    },

    devServer: {
        hot: true,
        contentBase: path.join(__dirname, '/dist'),
        publicPath: '',
        inline: true,
        port: 8080,
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
                        {loader: 'css-loader', options: {sourceMap: true}},
                        {loader: 'sass-loader', options: {sourceMap: true}},
                        {loader: 'postcss-loader',options: {
                            config: {path: path.resolve(__dirname, './postcss.config.js')}
                        }},
                    ]
                }),
                include: path.resolve(__dirname, './src'),
            },

            {
                test: /\.(img|jpg|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash:base64:5]',
                            output: 'images/',
                        }
                    }
                ],
                include: path.resolve(__dirname, './src/images'),
            },

            // {
            //     test: /\.(otf|eot|ttf|woff|woff2)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10000,
            //                 name: '[name].[ext]?[hash:base64:5]',
            //                 output: 'static/fonts',
            //             }
            //         }
            //     ],
            //     include: path.resolve(__dirname, './src'),
            // }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('devlopment'),
            __DEV__: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'style/[name].css'
        }),
        ...htmlPages()
    ],

    resolve: {
        extensions: ['.js', '.scss', '.json', '.css', '*'],
        alias: {
            images: path.resolve(__dirname, './src/images')
        }
    },

};