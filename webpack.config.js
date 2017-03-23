var path = require('path');
var util = require('util');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

const constants = {
  TEST: process.env.NODE_ENV === 'test',
  HOT: process.env.HOT === 'true',
  LOCAL: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'api',
  STAGE: process.env.NODE_ENV === 'stage',
  DEVELOP: process.env.NODE_ENV === 'develop',
  PRODUCTION: process.env.NODE_ENV === 'production',
};

const entries = [];

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new HtmlWebpackPlugin({
    title: 'mytest',
    version: '[hash]',
    hash: '[hash]',
    debug: 'true',
    env: process.env.NODE_ENV,
    template: path.join(__dirname, 'index.html'),
    filename: 'index.html',
  }),
  new AssetsPlugin({
    path: path.join(__dirname, 'build/'),
    filename: path.join('version.json'),
    fullPath: false,
  }),
];

if (constants.PRODUCTION || constants.STAGE) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }));
}

if (constants.LOCAL) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  
  entries.push('react-hot-loader/patch');
  entries.push('webpack-dev-server/client?http://localhost:8095');
  entries.push('webpack/hot/only-dev-server');
}

entries.push('./src/index');

module.exports = {
  devtool: constants.LOCAL || constants.TEST || constants.STAGE ? 'inline-source-map' : false,
  target: 'web',
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: path.join('js', util.format('[name].%s.js', '[hash]')),
    publicPath: '/'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      }
    ],
  }
};
