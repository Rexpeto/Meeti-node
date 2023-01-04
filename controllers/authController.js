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
    try {
        const user = req.body;
        const usuario = await Usuarios.create(user);

        //? Flash Message y redireccionar 
        req.flash('exito', 'Hemos enviado un correo electronico de verificación');
        res.redirect('/login');
    } catch (error) {
        if(error) {
            const errores = error.errors ? error.errors.map(err => err.message) : '';
            const resultado = validationResult(req).errors;

            const errExp = resultado.map(err => err.msg);

            const listaErrores = [...errores, ...errExp];

            if(!listaErrores) {
                req.flash('error', listaErrores);
            }
            res.redirect('/register');
        }
        
    }
}