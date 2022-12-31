import express from "express";
import dotenv from 'dotenv';
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import rutas from "./routes/index.js";
import { db } from "./config/db.js";

//? Creando app
const app = express();

//? Conexión a la base de datos
db.sync().then(() => console.log('Conectado a la BD 💻'));

//? Configuración de dotenv
dotenv.config({path: '.env'});

//? Habilitar EJS
app.use(expressEjsLayouts);
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