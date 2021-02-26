'use strict'


var app = require('./app');
var port = process.env.PORT || 3900;


/*('pruebasophos','root','root1234',{
	host: 'localhost',
	dialect: 'mysql'
});
*/

console.log("creado");

app.listen(port,function(){
	console.log("Servidor funcionando " + port);
});
