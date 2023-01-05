import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import util from 'util';
import ejs from 'ejs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

//? Configuración de dotenv
dotenv.config({path: '.env'});

//? Instancia de nodemailer
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

//? Envia el correo al usuario
export const enviarEmail = async opciones => {
    //* Leer el archivo para el email
    const archivo = `${__dirname}/views/emails/${opciones.archivo}.ejs`;
    
    //* Compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));

    //* Crear el HTML
    const html = compilado({url: opciones.url, nombre: opciones.usuario.nombre});

    //* Configurar opciones de email
    const opcionesEmail = {
        from: 'Meeti <noreply@meeti.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        html
    }

    //* Enviar email
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, opcionesEmail);
}