import { Router } from "express";
import { inicio } from "../controllers/homeController.js";
import { login, register } from "../controllers/authController.js";

const router = Router();

router.get('/', inicio);

router.get('/register', register);

router.get('/login', login);

export default router;