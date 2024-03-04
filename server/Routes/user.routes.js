import { Router } from "express";
import { login, logout, register } from "../controller/user.controller.js";
import upload from "../Middleware/multer.middleware.js";

const router=Router();

router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.get('/logout',logout);

export default router;