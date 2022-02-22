const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('usuario', {

    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    usuario: {
        type: DataTypes.STRING,
    },

    correo: {
      type: DataTypes.STRING,
    },
    
    contraseña: {
        type: DataTypes.STRING
    }


}, {timestamps: false,});
};