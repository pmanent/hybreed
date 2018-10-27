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
    publicPath: "dist/"
  },
  devtool: "source-map", // any "source-map"-like devtool is possible
  module: {
    rules: [

      {
          test: /\.ttf/,
          use: 'raw-loader'
      },
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
      new CopyWebpackPlugin([
          { from: 'src/fonts/**/*.ttf', to: './', force: true }
        ]),

      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
         filename: "[name].css",
         chunkFilename: "[id].css"
      })

    ],
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
};