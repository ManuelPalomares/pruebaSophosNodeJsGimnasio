'use strict'

var express = require('express');
var md_auth  = require('../middleware/authenticate');

var CiudadesCtrl = require('../controllers/ciudadesCtrl');

var api = express.Router();

api.post('/saveCiudad',md_auth.ensureAuth,CiudadesCtrl.saveCiudad);
api.get('/getCiudades',md_auth.ensureAuth,CiudadesCtrl.getListCiudades);

module.exports = api;