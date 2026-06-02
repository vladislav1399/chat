import express from 'express';
import http from 'http'
import sequelize from "./db.js";
import { fileURLToPath } from "url";
import path from "path";
import { auth } from "./midllewares/auth.js";
import { initWebSocket } from "./websocket.js";



export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app);

import authRouter from "./routes/auth.router.js";
import chatRouter from "./routes/chat.router.js";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRouter );
app.use("/chats", chatRouter)


app.get("/token", auth, (req, res) => {
    console.log(req.headers.authorization);
    console.log('ef')
    res.json({Message: "wfdsf"})
});

const wsServer = initWebSocket(server);

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



