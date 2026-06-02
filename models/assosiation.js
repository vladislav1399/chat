import { UserModel } from "./UserModel.js";
import { ChatModel } from "./ChatModel.js";
import { MessageModel } from "./MessageModel.js";

ChatModel.hasMany(MessageModel, {
    foreignKey: "chatId"
});

MessageModel.belongsTo(ChatModel, {
    foreignKey: "chatId"
});

UserModel.hasMany(MessageModel, {
    foreignKey: "userId"
});

MessageModel.belongsTo(UserModel, {
    foreignKey: "userId"
});

UserModel.belongsToMany(ChatModel, {
    through: "UserChats",
    foreignKey: "userId"
});

ChatModel.belongsToMany(UserModel, {
    through: "UserChats",
    foreignKey: "chatId"
});