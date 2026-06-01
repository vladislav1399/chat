import { UserModel } from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const secret = "secretkey"

export const registerUser = async (req, res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Empty fields" });
        }
        console.log(req.body)
        const exists = await UserModel.findOne({where: {username} })

        if (exists) {
            return res.status(409).json({ message: "User exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await UserModel.create({
            username,
            password: hashedPassword,
        })
        return res.status(201).json({
            id: user.id,
            username: user.username,});

    } catch (e) {
        return res.status(500).json({ message: "Server error" }, e);
    }

};

export const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        // 1. проверка полей
        if (!username || !password) {
            return res.status(400).json({ message: "Empty fields" });
        }

        // 2. ищем пользователя
        const user = await UserModel.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. проверка пароля через bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            secret,
            // process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        // 4. успех (не возвращаем пароль)
        return res.json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};