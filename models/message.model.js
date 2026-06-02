import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const MessageModel = sequelize.define("Messages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

    // timestamps: true
});