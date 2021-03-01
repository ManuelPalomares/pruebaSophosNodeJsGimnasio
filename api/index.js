'use strict'


var app = require('./app');

var port = process.env.PORT || 3900;






console.log("creado");

app.listen(port,function(){
	console.log("Servidor funcionando " + port);
});
