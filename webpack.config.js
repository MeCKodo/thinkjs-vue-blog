var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        index : './source/main.js',
        admin : './source/admin.js'
    },
    output: {
        path: path.resolve(__dirname, './www/static'),
        publicPath: '/static/',
        chunkFilename: 'js/[id].js',
        filename: '[name].build.js'
    },
    resolve: {
        root: [path.join(__dirname, 'node_modules'),path.join(__dirname, 'source')],
        alias: {
            'jquery': 'jquery/dist/jquery.min.js',
            'Vue': 'vue/dist/vue.js'
        },
        extensions: ['', '.js', '.vue', '.scss', '.css'] //设置require或import的时候可以不需要带后缀
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!sass")
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            }
        ]
    },
    babel: { //配置babel
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({ //为了配合thinkjs的目录定义 需要输出在view/home/[controller]/index.html 下
            filename : "../../view/home/index/index.html",
            template : "./source/index.html",
            inject:false
        }),
        new HtmlWebpackPlugin({
            filename : "../../view/home/admin/index.html",
            template : "./source/admin.html",
            inject:false
        })
    ],
    devServer: {
        historyApiFallback: true,
        // host: '0.0.0.0', // 统一localhost,为了可以内网手机调试
        port: 8200,
        // noInfo: true
    },
    vue: { //vue的配置,需要单独出来配置
        loaders: {
            js: 'babel'
        }
    },
    devtool: '#source-map'
};
var vueLoader = {
    js: 'babel',
    css: ExtractTextPlugin.extract('vue-style-loader',"css-loader"),
    scss: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader')
};
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.vue.loaders = vueLoader;

    // http://vuejs.github.io/vue-loader/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
