import express from "express";
import dotenv from 'dotenv';

const app = express();

dotenv.config({path: '.env'});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Funcionando en el puerto ${port} 🔥🔥🔥`));