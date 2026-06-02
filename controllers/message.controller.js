import {broadcastToRoom} from "../websocket.js";
import {MessageModel} from "../models/message.model.js";

export const createMessage = async (req, res) => {
    try {
        const { text, chatId,  } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Empty fields" });
        }

        const message = await MessageModel.create({
            text,
            chatId: Number(chatId),
            userId: Number(req.user?.id)
        })

        broadcastToRoom(chatId,{
            type: "message",
            chatId,
            text: message.text,
            userId: message.userId,
            messageId: message.id
        });

        return res.status(201).json(message);
    } catch (e) {
        return res.status(500).json({ message: "Server error" }, e);

    }
}

export const getMessagesByChats = async (req, res) => {
    try {
        const { chatId } = req.params;
        console.log(chatId)

        if (!chatId) {
            return res.status(400).json({
                message: "chatId is required"
            });
        }

        const messages = await MessageModel.findAll({
            where: {
                chatId: Number(chatId)
            },
            order: [["createdAt", "ASC"]]
        });

        return res.status(200).json(messages);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server error"
        });
    }

}