import { body, validationResult } from "express-validator";
import multer from "multer";
import shortid from "shortid";
import path from 'path';
import Categorias from "../models/Categorias.js";
import Grupos from "../models/Grupos.js";

export const nuevoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();
    
    res.render('nuevo-grupos', {
        pagina: 'Crea nuevo grupo',
        categorias
    });
}

//? Sube las imagenes de grupo
const __dirname = path.resolve();
const fileStorage = multer.diskStorage({
    destination:(req, file, next) => {

        next(null, `${__dirname}/public/uploads/grupos`);
    },
    filename: (req, file, next) => {
        const extension = file.mimetype.split('/')[1];
        next(null, `${shortid.generate()}.${extension}`);
    }
})

//* Configuración de multer
const configMulter = {
    limits: {filesize: 100000},
    storage: fileStorage
}

const upload = multer(configMulter).single('imagen');

export const subirImagen = async (req, res, next) => {
    upload(req, res, function (error) {
        if(error) {
            if(error instanceof multer.MulterError) {
                if(error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'Imagen muy grande');
                    res.redirect('/nuevo-grupo');
                }
            }
        } else {
            next();
        }
    })
}

//? Guarda los grupos
export const guardarGrupo = async (req, res) => {
    //* Sanitizar
    body('nombre').notEmpty().withMessage('El nombre no puede ir vació');
    body('descripcion').notEmpty().withMessage('La descripción no puede ir vacía');
    body('categoria').notEmpty().withMessage('Seleccione una categoria');

    const grupo = req.body;
    grupo.UsuarioId = req.user.id;
    grupo.categoriaId = req.body.categoria;
    grupo.imagen = req.file.filename;

    try {
        //* Almacena en la bd
        const nuevo = await Grupos.create(grupo);

        req.flash('exito', 'Se ha creado un grupo con exito');
        res.redirect('/administracion');
    } catch (error) {
        const errores = error.errors ? error.errors.map(err => err.message) : '';
        const resultado = validationResult(req).errors;

        const errExp = resultado.map(err => err.msg);

        const listaErrores = [...errores, ...errExp];

        req.flash('error', listaErrores);
        res.redirect('/nuevo-grupo');
    }
}