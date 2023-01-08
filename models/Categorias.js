import sequelize from 'sequelize';
import db from '../config/db.js';

const Categorias = db.define('categorias', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: sequelize.STRING,
        allowNull: false
    }
});

export default Categorias;