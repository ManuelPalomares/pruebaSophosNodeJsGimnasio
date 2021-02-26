'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//rutas


app.use(bodyParser.urlencoded({extented:false}));
app.use(bodyParser.json());


//configurar cabeceras

//rutas BASE

app.get('/prueba',function(req,res){
	res.status(200).send({message: ' Prueba Iniciando'})
});


module.exports = app;