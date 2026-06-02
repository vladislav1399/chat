import { DataTypes } from "sequelize";
import sequelize from "../db.js";

export const MessageModel = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    timestamps: true
});