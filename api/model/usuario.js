'use strict'

const { DataTypes } = require('sequelize');
//const sequelize = new Sequelize('mysql::memory:');
const sequelize = require('../conex');


const Usuario = sequelize.define('Usuario', {
    // Model attributes are defined here
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password : {
       type: DataTypes.STRING,
       allowNull: false
    },
    nombre : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    role: {
      type : DataTypes.STRING
    }
  }, {
    tableName: 'Usuarios'
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  console.log(Usuario === sequelize.models.Usuario); // true

  module.exports = sequelize.models.Usuario;
