'use strict'

const { DataTypes } = require('sequelize');
const sequelize = require('../conex');


const Sede = sequelize.define('Sede', {
    // Model attributes are defined here
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idciudad: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      capacidadmax: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
  }, {
    tableName: 'sedes'
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  console.log(Sede === sequelize.models.Sede); // true

  module.exports = sequelize.models.Sede;
