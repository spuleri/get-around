import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevConfig from '../webpack.dev.config';
import webpackProdConfig from '../webpack.prod.config';
import Translator from './translator';

// Get the current environment
const env = process.env.NODE_ENV || 'dev';
console.log(`CURRENTLY RUNNING IN ${env}`);

const app = express();

const port = (process.env.PORT || 8000);
app.set('port', port);


// Setup webpack config (Dev by default)
let compiler = webpack(webpackDevConfig);
if (env === 'production') {
  compiler = webpack(webpackProdConfig);
}

// Go up a directory to get static files (index.html)
app.use(express.static(path.join(__dirname, '/../')));

// For parsing application/json
app.use(bodyParser.json());

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
const server = app.listen(port, () => {
  console.log('App listening on port %s!', port);
});

// Define transaltor
const translator = new Translator();

// -------------------- API ROUTES -----------------------

// Get all valid languages
app.get('/languages', (req, res) => {
  console.log('Receievd GET Request at /languages');
  const languages = translator.getLanguageNames();
  res.send(languages);
});

// Translate text
app.post('/translate', (req, res) => {
  console.log('Receievd POST Request at /translate');
  console.log(req.body);

  // Get paramters
  const text = req.body.text;
  const from = req.body.from;
  const to = req.body.to;

  // Do translation
  translator.translate(text, from, to, (result, err) => {
    if (!err) {
      res.json({ translation: result });
    } else {
      const errorStatement = `Error translating ${text} from ${from} to ${to}`;
      console.log(errorStatement);
      res.status(500).send(errorStatement);
    }
  });
});

// Sample route
app.get('/data', (req, res) => {
  console.log('Receievd Request at /data');
  res.send('Hello World!');

  translator.translate('hello my name is Sergio', 'en', 'es');
});
