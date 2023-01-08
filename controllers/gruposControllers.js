import Categorias from "../models/Categorias.js";

export const nuevoGrupo = async (req, res) => {
    const categorias = await Categorias.findAll();
    
    res.render('nuevo-grupos', {
        pagina: 'Crea nuevo grupo',
        categorias
    });
}