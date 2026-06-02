import {Router} from "express";
import { registerUser, login, getLoginPage, getRegisterPage } from "../controllers/auth.controller.js";
const router = Router();

router.post('/register', registerUser)
router.post('/login', login )
router.get('/login', getLoginPage )
router.get('/register', getRegisterPage)

export default router;