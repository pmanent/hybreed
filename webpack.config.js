const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const webpack = require('webpack'); //to access built-in plugins

const devMode = process.env.NODE_ENV !== 'production';

const pathToMainJs = "./src/main.js";
const pathToMainScss = "./src/main.scss";


module.exports = {
  entry: [
      pathToMainJs,
      pathToMainScss
  ],
  mode: "development",
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
    publicPath: "/"
  },
  watch: true,
  module: {
    rules: [


      {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
      },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
      },

    ]
  },
  plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin('./dist'),
      new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/index.html'
          }),

      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
         filename: "[name].css",
         chunkFilename: "[id].css"
      })

    ],
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist'
    }
};