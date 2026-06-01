
import {Router} from "express";
import { registerUser, login } from "../controllers/auth.controller.js";
const router = Router();
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/register', registerUser)
router.post('/auth', login )
router.get('/auth',  (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});
router.get('/register',  (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
});

export default router;