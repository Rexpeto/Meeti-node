import sequelize from "sequelize";
import bcrypt from 'bcrypt-nodejs';
import db from '../config/db.js';

const Usuarios = db.define('Usuarios', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: sequelize.STRING(60),
    email: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {msg: 'Agregue un correo válido'}
        },
        unique: {
            args: 'El usuario ya existe'
        }
    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña no puede estar vació'
            }
        }
    },
    image: sequelize.STRING(60),
    activo: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    tokenPassword: sequelize.STRING,
    expiraToken: sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null);

        } 
    }
});

//? Método para comparar los password
Usuarios.prototype.validarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuarios;