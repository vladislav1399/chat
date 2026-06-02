import { DataTypes } from "sequelize"
import sequelize  from "../db.js"


export const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    timestamps: true
})