import { Router } from "express";
import { body } from "express-validator";
import { inicio } from "../controllers/homeController.js";
import { Autenticacion, confirmarC, crearUsuario, iniciarS, login, register } from "../controllers/authController.js";
import { adminPanel } from "../controllers/adminController.js";
import { editGroupForm, editGrupo, editImagen, eliminarGFrom, eliminarGrupo, guardarGrupo, imagenGrupoForm, nuevoGrupo, subirImagen } from "../controllers/gruposControllers.js";
import { nuevoMeetiFrom } from "../controllers/meetiController.js";

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

//? Editar imagen de grupos
router.get('/imagenG/:grupoId', Autenticacion, imagenGrupoForm);

//? Guardar imagen editada de grupo
router.post('/imagenG/:grupoId', Autenticacion, subirImagen, editImagen);

//? Eliminar grupo
router.get('/eliminarG/:grupoId', Autenticacion, eliminarGFrom);
router.post('/eliminarG/:grupoId', Autenticacion, eliminarGrupo);

//? Nuevo meeti
router.get('/nuevo-meeti', Autenticacion, nuevoMeetiFrom);

export default router;