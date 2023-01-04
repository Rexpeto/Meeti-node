import { body, validationResult } from 'express-validator'
import Usuarios from '../models/Usuarios.js'

export const register = (req, res) => {
    res.render('register', {
        pagina: 'Registro'
    })
}

export const login = (req, res) => {
    res.render('login', {
        pagina: 'Iniciar sesión'
    })
}

//? Crea un nuevo usuario en la db
export const crearUsuario = async (req, res) => {
    const user = req.body;

    console.log(user.password);

    try {
        const usuario = await Usuarios.create(user);

        //TODO: Flash Message y redireccionar 
        console.log(`Usuario creado correctamente:`, usuario);
    } catch (error) {
        const errores = error.errors.map(err => err.message);
        const resultado = validationResult(req).errors;

        const errExp = resultado.map(err => err.msg);

        const listaErrores = [...errores, ...errExp];

        console.log(listaErrores);

        req.flash('error', listaErrores);
        res.redirect('/register');
    }
}