import express from 'express';

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