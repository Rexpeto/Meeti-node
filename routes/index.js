import { Router } from "express";
import { body } from "express-validator";
import { inicio } from "../controllers/homeController.js";
import { Autenticacion, confirmarC, crearUsuario, iniciarS, login, register } from "../controllers/authController.js";
import { adminPanel } from "../controllers/adminController.js";
import { editGroupForm, editGrupo, guardarGrupo, nuevoGrupo, subirImagen } from "../controllers/gruposControllers.js";

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

//? Nuevo grupo
router.get('/nuevo-grupo', Autenticacion, nuevoGrupo);

//? Guardar grupo
router.post('/nuevo-grupo', Autenticacion, subirImagen, guardarGrupo);

//? Editar grupos
router.get('/editarG/:grupoId', Autenticacion, editGroupForm);

//? Guardar grupos
router.post('/editarG/:grupoId', Autenticacion, editGrupo);

export default router;