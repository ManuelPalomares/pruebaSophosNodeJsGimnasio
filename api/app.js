'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var app = express();


//rutas
var user_routes = require('./routes/usuarios');
var ciudades_routes = require('./routes/ciudades');
var sedes_routes = require('./routes/sedes');


app.use(bodyParser.urlencoded({extented:false}));
app.use(bodyParser.json());


//configurar cabeceras

//rutas BASE
app.use('/api',user_routes);
app.use('/api/ciudades/',ciudades_routes);
app.use('/api/sedes/',sedes_routes);




app.get('/prueba',function(req,res){
	res.status(200).send({message: ' Prueba Iniciando'})
});


module.exports = app;