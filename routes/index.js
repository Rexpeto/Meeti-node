import { Router } from "express";
import { inicio } from "../controllers/homeController.js";
import { crearUsuario, login, register } from "../controllers/authController.js";

const router = Router();

router.get('/', inicio);

router.get('/register', register);

router.get('/login', login);

//? Crea un nuevo usuario
router.post('/register', crearUsuario);

export default router;