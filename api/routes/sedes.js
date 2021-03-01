'use strict'

var express = require('express');
var md_auth  = require('../middleware/authenticate');

var SedesCtrl = require('../controllers/sedesCtrl');

var api = express.Router();

api.post('/saveSedes',md_auth.ensureAuth,SedesCtrl.saveSedes);
api.get('/getSedes',md_auth.ensureAuth,SedesCtrl.getListSedes);

module.exports = api;