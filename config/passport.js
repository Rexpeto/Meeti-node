import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../models/Usuarios.js";

passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        //* Se ejecuta al llenar el formulario
        const usuario = await Usuarios.findOne({where: {email, activo: 1}});

        //* Revisar si existe el email
        if(!usuario) return done(null, false, {message: 'El usuario no existe'});

        //* Si existe, comparar password
        const verificar = await usuario.validarPassword(password);

        //* Si el password es incorrecto
        if(!verificar) return done(null, false, {message: 'Contraseña incorrecta'});

        //* Todo fue bien
        done(null, usuario);
    }
));

passport.serializeUser(function (usuario, callback) {
    callback(null, usuario);
});

passport.deserializeUser(function (usuario, callback) {
    callback(null, usuario);
});

export default passport;