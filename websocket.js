import { WebSocketServer } from 'ws';

export const  initWebSocket = (server) =>  {

    const wsServer = new WebSocketServer({ server });

    wsServer.on('connection', (ws) => {
        console.log('Client connected');
    });

    return wsServer;
}
