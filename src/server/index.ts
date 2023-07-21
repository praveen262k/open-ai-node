import 'dotenv/config';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import initMiddleware from './middleware';
// @ts-ignore
import ask from '../api/ask'; 
import chat from '../api/chat';
// @ts-ignore
import fn from '../api/fn';
// const webpack = require('webpack');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackDevMiddleware = require('webpack-dev-middleware');

// const config = {
//   /* webpack options, including: */
//   entry: [
//     'react-hot-loader/patch',
//     'webpack-hot-middleware/client'
//   ]
// };
// const compiler = webpack(config);

const PORT = process.env.PORT || 3009;

const app = express();
// create application/json parser
var jsonParser = bodyParser.json();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const done = () => {

  app.post('/api/openai/ask', jsonParser, ask(openai));
  app.post('/api/openai/chat', jsonParser, chat(openai));
  app.post('/api/openai/fn', jsonParser, fn(openai));

  // app.use(
  //   webpackDevMiddleware(compiler, { /* webpack middleware options */ })
  // ).use(
  //   webpackHotMiddleware(compiler)
  // ).
  app.listen(PORT, () => {
    console.info('Environment => ', process.env.ENVIRONMENT);
    console.info(
      `-------------------------------------------------------- \n`,
      `Shell App is running: 🌎 http://localhost:${PORT} \n`,
      `API is running:       🌎 http://localhost:${PORT}/api \n`,
      `-------------------------------------------------------- \n`,
    );
  });
};

initMiddleware(express, app, done);

export default app;
