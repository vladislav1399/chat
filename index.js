const express = require('express');
const http = require('http');
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app);

app.use(express.static('public'));
const wsServer = new WebSocket.Server({server});

wsServer.on('connection', (ws) => {
    console.log(`Websocket connection connected: ${ws}`);


ws.on('message', (message) => {
    const data = message.toString();
    console.log(data)
    wsServer.clients.forEach( (client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(data)
        }
    })
  })
})

wsServer.on('close', () => {
    console.log(`Websocket connection disconnected: ${wsServer.clients.length}`);
})

server.listen(8880, () => {
    console.log('server starter 8880')
});