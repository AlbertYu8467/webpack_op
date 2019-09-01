const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const happypack = require('happypack')
const merge = require("webpack-merge");
const common = require("./webpack.base.js");

let prodConfig = {
  mode: "production",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "../dist")
    // publicPath:''
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "pastcss", //唯一标注
              sourceMap: false,
              plugins: loader => [require("autoprefixer")()]
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ] //从右往左编译.  style-loader处理成style标签插入页面
      },
      {//多线程打包
        test: /\.js$/,
        exclude: /node_modules/,
        include:path.resolve(__dirname,'../src'),
        use: [
          {
            loader: "happypack/loader?id=js",
          },
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "css/[name].[hash].css", // 设置最终输出的文件名和路径
      chunkFilename: "[id].[hash].css",
    }),
    new happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        //压缩js
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
    ]
  },
  performance: {
    //性能报警提示关闭
    hints: false
  }
};
module.exports = merge(common, prodConfig);
