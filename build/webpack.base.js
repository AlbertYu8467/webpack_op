const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
  entry: "./src/index.js",//下面babel配置默认从src解析
  resolve: {
    alias: {
      //简化引入的路径  eg: requrie('../../src/a.js') => require('@/a.js)
      "@": path.resolve(__dirname, "../src/")
    },
    //自动解析确定的扩展 eg: import Hello from '@components/Hello'
    //   => import Hello from '@components/Hello.vue';
    extensions: [".js", ".vue", ".json"] // 默认值: [".js",".json"]
  },
  externals: {
    /*step1: cdn 引入
    //step2: externals 配置 jquery: "jQuery",
    //step3: index.js 中引入 import $ from 'jquery'
    在runtime时通过cdn获取jquery依赖，把模块做成外部依赖，不会打包到js中
    */
    jquery: "jQuery",
    lodash : '_',
    echarts : 'echarts',
  },
  module: {
    /**
     * 不解析不依赖第三方模块的模块
     * 有一些第三方模块，它本身不依赖于其他模块，比如jquery，lodash，
     * 不去编译这些库，会使得webpack打包更加快速
     */
    noParse:/jquery|lodash/,
    rules: [
      {
          test:/\.html$/,
          loader:'html-withimg-loader?exclude=/static/'
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, "../src/")],//注意：路径根据配置文件的相对路径设置
        use: [
          {
            loader: "url-loader", // 根据图片大小，把图片优化成base64
            options: {
              limit: 5000,
              outputPath:'image'//文件打包后的图片位置
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页", // 默认值：Webpack App
      filename: "index.html", // 默认值： 'index.html',最终生成的文件名
      template: path.resolve(__dirname, "../src/template.html"), //模板文件
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeAttributeQuotes: false // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin(),
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'), // 不打包直接输出的文件
        to: './static', // 打包后静态文件放置位置
        ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
    }]),
    // new Webpack.ProvidePlugin({
    //   $:"jquery",//使用npm包引入，不用再每个页面import
    //   echarts:"echarts"
    // }),
    new Webpack.IgnorePlugin(/\.\/locale/,/moment/),//moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
  ]
};
