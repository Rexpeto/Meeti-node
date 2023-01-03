import express from 'express';
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

    const usuario = await Usuarios.create(user);

    //TODO: Flash Message y redireccionar 
    console.log(`Usuario creado correctamente:`, usuario);
}