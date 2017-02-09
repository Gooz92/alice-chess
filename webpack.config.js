const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const version = require('./package.json').version;
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
      { test: /\.hbs$/, loader: 'handlebars-loader' }
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