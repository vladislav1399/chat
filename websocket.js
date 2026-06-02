import { WebSocketServer } from "ws";

let clients = new Set();

const rooms = new Map(); // chatId -> Set(ws)

export function initWebsSocket(server) {
    const wsServer = new WebSocketServer({ server });

    wsServer.on("connection", (ws) => {

        ws.on("message", (data) => {
            const msg = JSON.parse(data);

            // 🔵 JOIN ROOM
            if (msg.type === "join") {

                const { chatId } = msg;

                if (!rooms.has(chatId)) {
                    rooms.set(chatId, new Set());
                }

                rooms.get(chatId).add(ws);
                ws.chatId = chatId;
            }

            // 🔵 MESSAGE
            if (msg.type === "message") {

                const { chatId, text, user } = msg;

                const room = rooms.get(chatId);

                if (!room) return;

                room.forEach(client => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({
                            type: "message",
                            chatId,
                            text,
                            user
                        }));
                    }
                });
            }
        });

        ws.on("close", () => {

            const chatId = ws.chatId;

            if (chatId && rooms.has(chatId)) {
                rooms.get(chatId).delete(ws);

                // 🧹 чистка пустых комнат
                if (rooms.get(chatId).size === 0) {
                    rooms.delete(chatId);
                }
            }
        });
    });

    return wsServer;
}

export function broadcast(data) {
    const message = JSON.stringify(data);

    clients.forEach(ws => {
        if (ws.readyState === 1) {
            ws.send(message);
        }
    });
}

export function broadcastToRoom(chatId, data) {

    const room = rooms.get(chatId);
    if (!room) return;

    const message = JSON.stringify(data);

    room.forEach(ws => {
        if (ws.readyState === 1) {
            ws.send(message);
        }
    });
}