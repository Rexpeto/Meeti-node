import Grupos from "../models/Grupos.js"

export const adminPanel = async (req, res) => {
    //* Consultar grupos el usuario
    const grupos = await Grupos.findAll({where: { UsuarioId: req.user.id }});


    res.render('adminPanel', {
        pagina: 'Panel de administración',
        grupos
    });
}