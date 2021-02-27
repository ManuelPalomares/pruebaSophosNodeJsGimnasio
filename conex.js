const { Sequelize } = require('sequelize');

const sequelize= new Sequelize('mysql://root:Qake3arena201401_@localhost/prueba_sophos');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;

