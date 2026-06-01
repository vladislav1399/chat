import express from 'express';
import http from 'http'
import { WebSocketServer } from "ws"

import sequelize from "./db.js";
import { fileURLToPath } from "url";
import path from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app);

import authRouter from "./routes/auth.router.js";


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRouter );

// app.get("/chat", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.get("/", (req, res) => {
    console.log('ef')
    res.json({Message: "wfdsf"})
});


const wsServer = new WebSocketServer({server});

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

const startServer = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    await server.listen(8880, () => {
        console.log('server starter 8880')
    });
}

startServer()



