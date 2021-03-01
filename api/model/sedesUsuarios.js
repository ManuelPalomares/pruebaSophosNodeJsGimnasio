'use strict'

const { DataTypes } = require('sequelize');
const sequelize = require('../conex');


const SedeUsuario = sequelize.define('SedeUsuario', {
    // Model attributes are defined here
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_sede: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    id_usuario: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {
    tableName: 'sedes_usuarios'
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  console.log(SedeUsuario === sequelize.models.SedeUsuario); // true

  module.exports = sequelize.models.SedeUsuario;
