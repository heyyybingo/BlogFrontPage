const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
var path = require("path")
module.exports = {
    entry: __dirname + "/src/app.js",
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js',

    },
    module: {
        rules: [{
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100,
                        name: 'src/lib/image/[name].[ext]',


                    }
                }],

            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: ['url-loader']
            }
        ]
    },
    devServer: {
        host: "0.0.0.0",
        hot: true,
        proxy: {
            '/blog/api': {
                target: 'http://localhost:3002',
                pathRewrite: {
                    '/blog/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: "index.html"
        }),

        new VueLoaderPlugin()


    ]
}