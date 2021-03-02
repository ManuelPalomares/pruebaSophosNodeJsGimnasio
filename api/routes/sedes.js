'use strict'

var express = require('express');
var md_auth  = require('../middleware/authenticate');

var SedesCtrl = require('../controllers/sedesCtrl');

var api = express.Router();

api.post('/saveSedes',md_auth.ensureAuth,SedesCtrl.saveSedes);
api.get('/getSedes',SedesCtrl.getListSedes);
api.get('/getListaSedesByCiudad/:idciudad',SedesCtrl.getListaSedesByCiudad);


module.exports = api;