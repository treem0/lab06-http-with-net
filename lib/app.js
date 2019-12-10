const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    if(request.method === 'GET' && request.path === '/') {
      socket.end(createResponse({ body: 'Hi' }));
    }
    else if(request.method === 'POST' && request.path === '/echo'){
      socket.end(createResponse({ body: request.body, contentType: 'text/plain', status: 200 }));
    }
    else if(request.method === 'GET' && request.path === '/red'){
      socket.end(createResponse({ body: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        <h1>red</h1>
      </body>
      </html>`, contentType: 'text/html' }));
    }
    else if(request.method === 'GET' && request.path === '/green'){
      socket.end(createResponse({ body: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        <h1>green</h1>
      </body>
      </html>`, contentType: 'text/html' }));
    }
    socket.end(createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' }));
  });
});

module.exports = app;
