'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuarioController');
var md_auth  = require('../middleware/authenticate');

var api = express.Router();

api.post('/resgister',UsuarioController.saveUser);
api.get('/getUsersBySede/:idsede',md_auth.ensureAuth,UsuarioController.getUserBySede);
api.post('/loginUser',UsuarioController.loginUser);



module.exports = api;