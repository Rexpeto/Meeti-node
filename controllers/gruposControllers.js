import { body, validationResult } from "express-validator";
import Categorias from "../models/Categorias.js";
import Grupos from "../models/Grupos.js";

export const nuevoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();
    
    res.render('nuevo-grupos', {
        pagina: 'Crea nuevo grupo',
        categorias
    });
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