# Net

## Resources

* [Net](https://nodejs.org/api/net.html)
* [Regular Expression](https://regexone.com/lesson/introduction_abcs)
* [RegExr](https://regexr.com/)

## Agenda

* Regular Expressions
* tcp
* net

## Regular Expressions

### Creating Regular Expressions

```js
const pattern = new RegExp('\d{2}');
```

```js
const pattern = /\d{2}/;
```

### Flags

flag | description
---- | -----------
`g`  | global search
`i`  | case insensitive search

### Character matchers

symbol | description
------ | -----------
`.`    | any character
`\w`   | word character
`\W`   | not word character
`\d`   | digit character
`\D`   | not digit character
`\s`   | whitespace
`\S`   | not whitespace
`[]`   | any of
`[^]`  | not any of
`[a-z]`| any between

### Anchors

symbol | description
------ | -----------
`^`    | start of string
`$`    | end of string
`\b`   | word boundary
`\B`   | not word boundary

### Capture groups

symbol | description
------ | -----------
`()`   | capture group
`\1`   | back reference
`(?<name>)` | named capture group

### Quantifiers

symbol | description
------ | -----------
`*`    | 0 or more
`+`    | 1 or more
`?`    | 0 or 1
`{2}`  | 2
`{2,5}`| between 2 and 5
`{2,}` | 2 or more
`ab|cd`| match ab or cd

### JavaScript

```js
const pattern = /abc/g;
'abcdef'.match(pattern);
```

```js
const pattern = /abc/g;
pattern.exec('abcdef');
```

```js
const pattern = /abc/g;
pattern.test('abcdef');
```

## Server vs Client

Up until now you have been working on client side code (front-end). This
code runs on a users machine, a machine that we are not in control of.

### Server

Server side code runs on a machine that we control, often a cloud based
computer. The server is responsible for communicating information to clients
over a network. So far we've used netlify and GitHub pages as our server.
In both cases, the server was responsible for communicating our HTML, CSS,
and JavaScript files over the network.

### Clients

Client side code runs on client machines, typically in a browser. The client
itself (the browser) is responsible for requesting information from a server.
In our previous experience the client would request HTML, CSS, and JavaScript
from a server.

type | description
---- | -----------
client | a program that connects to a server to request a service (browser)
client side code | code that runs on a client
server | a computer that provides a service and allows clients to connect
server side code | code that runs on a server

## TCP

Transmission Control Protocol (TCP) allows computers to connect and share information.
Data that is shared between the computers is reliable and ordered. This is accomplished by
sharing synchronization numbers between the two machines. The number is incremented
on each message.

### Handshake

1. The client sends a SYN message to the server
1. The server responds with a SYN-ACK to the client
1. The client responds with an ACK to the server

#### SYN

The client sends a SYN message to the server along with a random number (A).
This number will be used to synchronize messages from the client to the
server. This allows the server to know if any messages are dropped and
allows the server to keep the messages in order.

This step proves that the server is able to receive information from the
client.

### SYN-ACK

The server sends a SYN-ACK to the client with the clients SYN number plus
1 (A+1). It also sends its own random number to the client (B). This number
will be used to synchronize messages from the server to the client. This
allows the client to know if any messages are dropped and allows the client
to keep the messages in order.

This step proves that the client is able to receive information from the
server.

### ACK

The client then sends back A+1 and B+1. This acknowledges that the client
was able to receive messages from the server.

## net

### Creating a server

```js
const { createServer } = require('net');

const server = createServer(sock => {
  // this callback is invoked for each
  // successful connection.
  // sock is an active client connection
});

server.listen(7890);
```

### Creating a client

```js
const { createConnection } = require('net');

const client = createConnection(7890, () => {
  // this callback is invoked after the client
  // successfully connects
});

client.on('data', chunk => {
  console.log(chunk.toString());
});
```

## HTTP

HTTP (Hypertext Transfer Protocol) is an application protocol used to send
information across the web. It follows a standard flow:

1. a client creates a connection to a server
2. the client sends a request to the server

```
GET / HTTP/1.1
Host: example.com
Accept-Language: us-en
```

3. the server sends a response to the client

```
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 25 Jun 2019 15:57:17 GMT
Accept-Ranges: bytes
Content-Length: 269
Content-Type: text/html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Example</h1>
</body>
</html>
```

4. close the connection

### HTTP Request parts

```
GET /dog HTTP/1.1
Host: example.com
Accept-Language: us-en
```

* `GET` is the method used. Other common methods:

method  | description
------- | -----------
`POST`  | used to create new information on the server
`GET`   | used to get information from the server
`PUT`   | used to update information on the server
`PATCH` | used to partially update information on the server
`DELETE`| used to delete information on the server

* `/` the path we are requesting. You will see this path in the url
  bar of your browser
* `HTTP/1.1` the protocol and version we are using
* the following lines are all headers
  * `Host: example.com` the host that you are making a request to
  * `Accept-Language: us-en` lets the server know what language you support

### HTTP Response parts

```
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Accept-Ranges: bytes
Content-Length: 269
Content-Type: application/json

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Example</h1>
</body>
</html>
```

* `HTTP/1.1` the protocol and version
* `200 OK` the status code and status message. Other common status codes:

code | message               | description
---- | --------------------- | -----------
200  | OK                    | The request succeeded
204  | No Content            | The request succeeded but no content was sent back
301  | Moved Permanently     | The requested resource has moved
304  | Not Modified          | The resource has not changed. Use your cache
400  | Bad Request           | The server could not understand the request
401  | Unauthorized          | The client is not logged in
403  | Forbidden             | The client is logged in but not allowed
404  | Not Found             | The resource is not found
500  | Internal Server Error | There is a server on the server side
503  | Service Unavailable   | The server is down
504  | Gateway Timeout       |  The server took too long to respond

* the following lines are header information
* a single empty line
* the data sent back as a response

### HTTP server in JavaScript

```js
const { createServer } = require('http');

const server = createServer((req, res) => {
  // handle a request
  // send a response
});

server.listen(7890, () => {
  console.log('listening on 7890')
});
```

`createServer` is used to create a new node HTTP server. It takes a single
callback that is invoked whenever a new request hits our server.

parameter | description
--------- | -----------
`req`     | the request object
`res`     | the response object

#### Request

The request object can be used to get information about the incoming request.

properties | description
---------- | -----------
`headers`  | get the request headers as an object
`url`      | get the requested url

#### Response

The response object can be used to create and send the outgoing response

properties/methods | description
------------------ | -----------
`setHeader(name, value)` | set a header
`statusCode`       | set the status code
`end`            | write information for the response body and end the request

#### Listening

When you are ready to start your server you have to listen on a port.
A port is like a door, incoming requests will hit a port and then be
handled by the process listening on that port.
