import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import expressEjsLayouts from "express-ejs-layouts";
import rutas from "./routes/index.js";
import db from "./config/db.js";
import Usuarios from "./models/Usuarios.js";
import Categorias from "./models/Categorias.js";
import Grupos from "./models/Grupos.js";
import passport from "./config/passport.js";

//? Creando app
const app = express();

//? Conexión a la base de datos
db.sync().then(() => console.log('Conectado a la BD 💻'));

//? Configuración de dotenv
dotenv.config({path: '.env'});

//? Habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//? Habilitar EJS
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

//? Estableciendo ruta de vistas
app.set('views', './views');

//? Static Files
app.use(express.static('public'));

//? Habilitar cookie parser
app.use(cookieParser());

//? Crear sesión
app.use(session({
    secret: process.env.secret,
    key: process.env.key,
    resave: false,
    saveUninitialized: false
}));

//? Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

//? Agrega flash messages
app.use(flash());

app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
})

//? Utilización de rutas
app.use('/', rutas);

//? utilizando el puerto
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Funcionando en el puerto ${port} 🔥🔥🔥`));