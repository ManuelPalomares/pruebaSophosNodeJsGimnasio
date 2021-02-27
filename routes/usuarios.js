'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuarioController');

var api = express.Router();

api.post('/resgister',UsuarioController.saveUser);

module.exports = api;