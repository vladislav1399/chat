import {ChatModel} from "../models/chat.model.js";


export const createChat = async (req, res) => {

    try {
            const { title, image } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Empty fields" });
        }

        const exists = await ChatModel.findOne({where: {title} })

        if (exists) {
            return res.status(409).json({ message: "Такое имя комнаты уже существует" });
        }

        const chat = await ChatModel.create({
            title,
            image
        })
        // await chat.addUser(req.user.id);
        return res.status(201).json(chat);
    } catch (e) {
        return res.status(500).json({ message: "Server error" }, e);

    }
}

export const getChats = async (req, res) => {
    const chats = await ChatModel.findAll()
    res.status(200).json(chats);
}