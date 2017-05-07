const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const { version } = require('./package.json');
const date = getDate();

function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return [
    year,
    month < 10 ? '0' + month : month,
    date < 10 ? '0' + date : date
  ].join('-');
}

module.exports = {
  entry: './src/browser/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.min.js'
  },

  module: {
    loaders: [
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
          test: /\.less$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "less-loader", options: {
                  strictMath: true,
                  noIeCompat: true
              }
          }]
        }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new HtmlWebpackPlugin({
      version, date,
      inlineSource: '.(js|css)$',
      template: 'src/browser/view/index.hbs'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]

};