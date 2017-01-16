import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const app = express();

const compiler = webpack(webpackConfig);

// Go up a directory to get static files (index.html)
app.use(express.static(path.join(__dirname, '/../')));

// Webpack configuration
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true
  },
  historyApiFallback: true,
  log: console.log
}));

// Start listening
const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

// Sample route
app.get('/data', (req, res) => {
  console.log('Receievd Request at /data');
  res.send('Hello World!');
});
