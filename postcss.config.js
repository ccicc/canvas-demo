/**
 * 
 * postcss配置文件
 * 
 */


 const AUTOPREFIXER_BROWSER = ['ie >= 11', '> 1% in CN'];
 const syntax = require('postcss-scss');

 module.exports = {
    parser: 'postcss-scss',
    syntax: 'postcss-scss',
    sourceMap: true,
    plugins: [
        require('autoprefixer')({browsers: AUTOPREFIXER_BROWSER}),
        require('rucksack-css')({autoprefixer: true})
    ]
 }