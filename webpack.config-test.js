const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");



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
  watch: false,
  module: {
    rules: [
      {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'

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
      {
          test: /test\.js$/,
          use: 'mocha-loader',
          exclude: /node_modules/
      }

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
      }),
      new MinifyPlugin({} , {}),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      })

    ],

    devServer: {
        contentBase: './dist'
    }
};
