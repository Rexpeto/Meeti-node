import { Router } from "express";

const router = Router();

router.get('/', (req, res) => res.render('home'));

router.get('/register', (req, res) => res.send('Crear cuenta'));

export default router;