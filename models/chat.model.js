import { DataTypes } from "sequelize"
import sequelize  from "../db.js"

export const ChatModel = sequelize.define("Chats", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    // разабраться почему не работает
    // timestamps: true
})