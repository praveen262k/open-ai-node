import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/components/App';

export default async (req, res, next) => {
  const helmet = Helmet.renderStatic();
  let didError = false;

  const stream = renderToPipeableStream(<App />, {
    onAllReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      res.write(`<!DOCTYPE html`);
      res.write(`<html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>`);
      res.write(`<div id="root">`);
      stream.pipe(res);
      res.write(`</div>`);
      res.write(
        `<script async data-chunk="main" src="http://localhost:3009/static/main.js"></script>`,
      );
      res.write(`</body></html>`);
    },
    onShellError() {
      res.statusCode = 500;
      res.send(`<h1>An error occurred</h1>`);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  });
};
