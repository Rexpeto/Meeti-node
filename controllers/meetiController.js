import Grupos from "../models/Grupos.js";

export const nuevoMeetiFrom = async (req, res) => {
    const grupos = await Grupos.findAll({ where: { UsuarioId: req.user.id } });

    res.render('nuevo-meeti', {
        pagina: 'Nuevo meeti',
        grupos
    });
}