import express from "express";
import dotenv from 'dotenv';
import path from "path";
import rutas from "./routes/index.js";

//? Creando app
const app = express();

//? Configuración de dotenv
dotenv.config({path: '.env'});

//? Habilitar EJS
app.set('view engine', 'ejs');

//? Estableciendo ruta de vistas
app.set('views', './views');

//? Static Files
app.use(express.static('public'));

//? Utilización de rutas
app.use('/', rutas);

//? utilizando el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Funcionando en el puerto ${port} 🔥🔥🔥`));