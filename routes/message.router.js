import {Router} from "express";
import {createMessage, getMessagesByChats} from "../controllers/message.controller.js";
import {auth} from "../midllewares/auth.js";

const router = Router();

router.post("/", auth, createMessage)
router.get("/:chatId", auth, getMessagesByChats);

export default router;