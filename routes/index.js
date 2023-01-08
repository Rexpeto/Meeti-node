import { Router } from "express";
import { body } from "express-validator";
import { inicio } from "../controllers/homeController.js";
import { Autenticacion, confirmarC, crearUsuario, iniciarS, login, register } from "../controllers/authController.js";
import { adminPanel } from "../controllers/adminController.js";

const router = Router();

router.get('/', inicio);

router.get('/register', register);

router.get('/login', login);

//? Crea un nuevo usuario
router.post('/register',
body('password_r').notEmpty().withMessage('Repetir contraseña no puede estar vació'),
crearUsuario);

//? Confirma un usuario
router.get('/confirmar-cuenta/:email', confirmarC);

//? Inicia sesión
router.post('/login', iniciarS);

//? Panel de administración
router.get('/administracion', Autenticacion, adminPanel);

export default router;