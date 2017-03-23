//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('./webpack.config');
//
//new WebpackDevServer(webpack(config), {
//  publicPath: config.output.publicPath,
//  hot: true,
//  historyApiFallback: true,
//  stats: {
//    assets: false,
//    version: false,
//    hash: false,
//    timings: false,
//    chunks: false,
//    chunkModules: false,
//    colors: true,
//  },
//}).listen(8095, 'localhost', function (err, result) {
//  if (err) {
//    console.log(err);
//  }
//
//  console.log('Listening at localhost:8095');
//});

const http = require('http');
const express = require('express');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

// Create the app, setup the webpack middleware
const app = express();
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    assets: false,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    colors: true,
  },
}));
app.use(require('webpack-hot-middleware')(compiler));

// You probably have other paths here
app.use(express.static('dist'));

const server = new http.Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8090;

server.listen(PORT);

io.on('connection', (socket) => {
  // <insert relevant code here>
  socket.emit('mappy:playerbatch', 'test');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('message', '10');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
