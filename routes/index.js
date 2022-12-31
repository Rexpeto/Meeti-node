import { Router } from "express";

const router = Router();

router.get('/inicio', (req, res) => res.send('inicio'));

router.get('/register', (req, res) => res.send('Crear cuenta'));

export default router;