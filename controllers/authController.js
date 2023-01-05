import { validationResult } from 'express-validator'
import Usuarios from '../models/Usuarios.js'
import { enviarEmail } from '../handlers/email.js'

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

        //* Generar url de confirmación
        const url = `https://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        //* Enviar correo de confirmación
        await enviarEmail({
            usuario: user,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            archivo: 'confirmar-cuenta'
        });

        //* Flash Message y redireccionar 
        req.flash('exito', 'Hemos enviado un correo electronico de verificación');
        return res.redirect('/login');
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
        
        console.log(error);
    }
}

//? Confirma la cuenta
export const confirmarC = async (req, res, next) => {
    const {email} = req.params;

    try {
        //* Verficiar si existe el usuario
        const usuario = await Usuarios.findOne({where: {email}});

        //* Sino existe, enviarlo a login
        if(!usuario) {
            req.flash('error', 'No existe esa cuenta');
            res.redirect('/register');
            return next();
        }

        //* si existe, confirmarlo en db
        usuario.activo = 1;
        await usuario.save();

        req.flash('exito', 'Confirmado exito');
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}