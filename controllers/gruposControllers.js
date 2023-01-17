import { body, validationResult } from "express-validator";
import multer from "multer";
import shortid from "shortid";
import path from 'path';
import fs from 'fs';
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
    limits: {filesize: 10000},
    storage: fileStorage,
    fileFilter: (req, file, next) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            console.log('true en imagen')
            next(null, true);
        } else {
            next(new Error('Formato no válido'), false);
        }
    }
}

const upload = multer(configMulter).single('imagen');

export const subirImagen = async (req, res, next) => {
    upload(req, res, function (error) {
        if(error) {
            if(error instanceof multer.MulterError) {
                if(code.error === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es demasiado grande');
                } else {
                    req.flash('error', error.message);
                }
            } else if(error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }

            res.redirect('back');
            return;
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
    
    if(req.file) {
        grupo.imagen = req.file.filename;
    }

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

//? Editar grupos
export const editGroupForm = async (req, res) => {
    //* Consultas
    const consultas = [];
    consultas.push(Grupos.findByPk(req.params.grupoId));
    consultas.push(Categorias.findAll());

    //* Promise de consultas
    const [grupo, categorias] = await Promise.all(consultas);

    res.render('editar-grupo', {
        pagina: `Editar grupo ${grupo.nombre}`,
        grupo,
        categorias
    });
}

//? Guarda los cambios en la BD
export const editGrupo = async (req, res, next) => {
    try {
        const grupo = await Grupos.findOne({ where: { id: req.params.grupoId, UsuarioId: req.user.id } });

        //* Si no es el dueño
        if(!grupo) {
            req.flash('error', 'Oops! Ocurrio un error');
            res.redirect('/administracion');
            return next();
        }

        //* Si todo está bien
        const {nombre, descripcion, categoria, url} = req.body;

        //* Asignar valores
        grupo.nombre = nombre;
        grupo.descripcion = descripcion;
        grupo.url = url;
        grupo.categoriaId = categoria;

        //* Guardar los valores en la BD
        await grupo.save();
        req.flash('exito', 'Editado correctamente');
        res.redirect('/administracion');

    } catch (error) {
        console.log(error);
    }
}

//? Formulario para editar la imagen de grupo
export const imagenGrupoForm = async (req, res) => {
    try {
        const grupo = await Grupos.findOne({ where: { id: req.params.grupoId, UsuarioId: req.user.id } });

        res.render('imagen-grupo', {
            pagina: `Imagen del grupo ${grupo.nombre}`,
            grupo
        });

    } catch (error) {
        console.log(error);
    }
}

//? Controlador para guardar la imagen editada en la BD
export const editImagen = async (req, res, next) => {
    try {
        const grupo = await Grupos.findOne({ where: { id: req.params.grupoId, UsuarioId: req.user.id } });

        //* Si no consigue el grupo
        if(!grupo) {
            req.flash('error', 'Oops! Ocurrio un error');
            res.redirect('/administracion');
            return next();
        }

        //* Si hay imagen anterior y nueva, hay que borrar
        if(req.file && grupo.imagen) {
            const __dirname = path.resolve();
            const imagenAnteriorPath = `${__dirname}/public/uploads/grupos/${grupo.imagen}`;

            //* Eliminar imagen anterior
            fs.unlink(imagenAnteriorPath, error => {
                if(error) {
                    console.log(error);
                }

                return;
            });
        }

        //* Almacenar imagen
        if(req.file) {
            grupo.imagen = req.file.filename;
        }

        //* Almacenar en la BD
        await grupo.save();
        req.flash('exito', 'Se edito la imagen del grupo con exito');
        res.redirect('/administracion');

    } catch (error) {
        console.log(error);
    }
}

//? Formulario de eliminar grupo
export const eliminarGFrom = async (req, res, nex) => {
    try {
        const grupo = await Grupos.findOne({ where: { id: req.params.grupoId, UsuarioId: req.user.id } });

        //* Si el grupo no le pertenece
        if(!grupo) {
            req.flash('error', 'Oops! Ocurrio un error');
            res.redirect('/administracion');
            return next();
        }

        res.render('eliminar-grupo', {
            pagina: `Eliminar el grupo ${grupo.nombre}`
        });
        
    } catch (error) {
        console.log(error);
    }
}

//? Eliminar grupo
export const eliminarGrupo = async (req, res, next) => {
    try {
        const grupo = await Grupos.findOne({where: {id: req.params.grupoId, UsuarioId: req.user.id}});

        if(!grupo) {
            req.flash('error', 'Oops! Ocurrio un error');
            res.redirect('/administracion');
            return next();
        }

        //* Si tiene una imagen
        if(grupo.imagen) {
            const __dirname = path.resolve();
            const imagenAnteriorPath = `${__dirname}/public/uploads/grupos/${grupo.imagen}`;

            //* Eliminar imagen
            fs.unlink(imagenAnteriorPath, error => {
                if(error) {
                    console.log(error);
                }

                return;
            });
        }

        //* Eliminar el grupo
        await Grupos.destroy({
            where: {
                id: req.params.grupoId
            }
        });

        req.flash('exito', 'Grupo eliminado con exito');
        res.redirect('/administracion');

    } catch (error) {
        console.log(error);
    }
}