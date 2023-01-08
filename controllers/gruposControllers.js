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
    const grupo = req.body;

    try {
        //* Almacena en la bd
        const nuevo = await Grupos.create(grupo);

        req.flash('exito', 'Se ha creado un grupo con exito');
        res.redirect('/administracion');
    } catch (error) {
        console.log(error);
        req.flash('error', error);
        res.redirect('/nuevo-grupo');
    }
}