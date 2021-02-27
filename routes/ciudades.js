'use strict'

var express = require('express');
var CiudadesCtrl = require('../controllers/ciudadesCtrl');

var api = express.Router();

api.post('/saveCiudad',CiudadesCtrl.saveCiudad);
api.get('/getCiudades',CiudadesCtrl.getListCiudades);

module.exports = api;