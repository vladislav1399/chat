import express from 'express';
import http from 'http'
import sequelize from "./db.js";
import { fileURLToPath } from "url";
import path from "path";
import { auth } from "./midllewares/auth.js";
import { initWebsSocket } from "./websocket.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app);

import authRouter from "./routes/auth.router.js";
import chatRouter from "./routes/chat.router.js";
import messagesRouter from "./routes/message.router.js";

import {MessageModel} from "./models/message.model.js";
import {ChatModel} from "./models/chat.model.js";
import {UserModel} from "./models/user.model.js";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter );
app.use("/chats", chatRouter)
app.use("/messages", messagesRouter)


app.get("/token", auth, (req, res) => {
    console.log(req.headers.authorization);
    console.log('ef')
    res.json({Message: "wfdsf"})
});

initWebsSocket(server);

const startServer = async () => {
    await sequelize.authenticate();
    await sequelize.sync();

    // User -> Message
    UserModel.hasMany(MessageModel, { foreignKey: "userId" });
    MessageModel.belongsTo(UserModel, { foreignKey: "userId" });

    // Chat -> Message
    ChatModel.hasMany(MessageModel, { foreignKey: "chatId" });
    MessageModel.belongsTo(ChatModel, { foreignKey: "chatId" });

    await server.listen(8880, () => {
        console.log('server starter 8880')
    });
}

startServer()




