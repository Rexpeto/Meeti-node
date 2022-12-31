import express from 'express';

export const inicio = (req, res) => {
    res.render('home', {
        pagina: 'inicio'
    })
}