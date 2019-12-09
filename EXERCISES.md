# Net Exercise

[Example](https://github.com/alchemycodelab/fsjs-be-demos/tree/master/02_node/03_net/exercise-2)

Create a `client.js` and a `server.js` echo connection

Server:
* Whenever a new client connects to your server send the client a message 'I will echo!'.
* Whenever you receive data from a client write back with the same data.

Client:
* When you connect to a server send the server a message 'Hello!'.
* Whenever you receive data from a server `console.log`
* every 1 second send the server the current time
