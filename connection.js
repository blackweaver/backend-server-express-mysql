//Módulo MYSQL para crear la conexión
var mysql = require('mysql');
function Conexion(){
	//Inicio la variable con los datos de conexión
	this.pool = null;
	//Inicio la conexión estableciendo los datos
	this.inicia = function(){
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'fullstack',
			//socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
		})
	}
	//Método para otener la conexíon ya creada
	this.obtener = function(callback){
		this.pool.getConnection(function(error, connection){
			callback(error, connection);
		})
	}
}
//Exporto la clase del módulo de conexión
module.exports = new Conexion();