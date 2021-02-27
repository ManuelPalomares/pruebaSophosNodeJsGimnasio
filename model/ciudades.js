'use strict'

const { DataTypes } = require('sequelize');
//const sequelize = new Sequelize('mysql::memory:');
const sequelize = require('../conex');


const Ciudad = sequelize.define('Ciudad', {
    // Model attributes are defined here
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'ciudades'
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  console.log(Ciudad === sequelize.models.Ciudad); // true

  module.exports = sequelize.models.Ciudad;
