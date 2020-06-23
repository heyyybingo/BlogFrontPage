<!-- 项目基本配置 -->
1.webpack 打包
2.vue框架
3.element-ui  UI框架快速开发


配置 webpack
没有全局安装需要先进行全局安装
    1.安装webpack项目依赖 npm install -D webpack
    2.安装webpack-cli项目依赖 npm install -D webpack-cli
    3.创建src，dist文件夹
    4.创建webpack配置文件，webpack.config.js
        #添加入口出口文件信息
        var path=require("path");
        module.exports={
            entry:__dirname+"/src/app.js",
            output:{
            path:__dirname+"/dist",
            filename:'bundle.js'
            }
        }
配置 webpack-dev-server
没有全局安装先进行全局安装
    1.安装webpack项目依赖 npm install -D webpack-dev-server
    2.热更新以及更改server地址：
        在webpack.config.js中添加
        devServer: {
        host: "0.0.0.0",
        hot: true
     },
     3.在package.json中添加命令
添加webpack loader
    1.es6->es5 babel 
    2.vue   vue-loader
    3.css  css-loader style-loader
    4.sass sass-loader (需要前下载node-sass)
    5.字体文件，图片 url-loader

添加webpack plugin
    1.生成index.html文件并添加webpack打包的js文件   html-webpack-plugin
    2.vue查检 VueLoaderPlugin
    3.热更新 webpack.HotModuleReplacementPlugin()
