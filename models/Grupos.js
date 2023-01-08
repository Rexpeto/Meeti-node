import {DataTypes} from 'sequelize';
import db from '../config/db.js';
import Categorias from './Categorias.js';
import Usuarios from './Usuarios.js'

const Grupos = db.define('grupos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nombre no puede ir vació'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Descripción no puede ir vació'
            }
        }
    },
    imagen: DataTypes.STRING,
    url: DataTypes.STRING
});

//? Asociación 1-1
//* Un grupo tiene una categoría
Grupos.belongsTo(Categorias);

//? Asociación 1-1
//* Un grupo tiene un usuario
Grupos.belongsTo(Usuarios);

export default Grupos;