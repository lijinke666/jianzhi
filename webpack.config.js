/**
 * Created by Administrator on 2016/10/25.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    //插件项
    plugins: [new ExtractTextPlugin("[name].less")],
    //页面入口文件配置
    entry: {
        index : './src/js/index.js',
        login : './src/js/reg.js'
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname,"dist"),
        publicPath:"/dist/",
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/, loader: 'babel'},
            /*{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },*/
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.less$/, loader:ExtractTextPlugin.extract("style-loader","css-loader","less-loader") }
        ]
    }
};