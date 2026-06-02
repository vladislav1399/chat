import {Router} from "express";
import {createChat, getChats} from "../controllers/chat.controller.js";
import {auth} from "../midllewares/auth.js";

const router = Router();

router.post("/", auth, createChat);
router.get("/", auth, getChats);

export default router;