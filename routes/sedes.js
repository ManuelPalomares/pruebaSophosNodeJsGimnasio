'use strict'

var express = require('express');
var SedesCtrl = require('../controllers/sedesCtrl');

var api = express.Router();

api.post('/saveSedes',SedesCtrl.saveSedes);
api.get('/getSedes',SedesCtrl.getListSedes);

module.exports = api;