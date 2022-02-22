const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tarea', {

    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    titulo: {
        type: DataTypes.STRING,
    },

    descripcion: {
        type: DataTypes.STRING,
    },

    prioridad: {
        type: DataTypes.STRING
    },

    fechaCreacion: {
        type: DataTypes.STRING,
    },

    fechaModificacion: {
        type: DataTypes.STRING,
    }

}, {timestamps: false,});
};