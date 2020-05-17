//Función para permitir dominios externos
function AllowCrossDomain(){
	//Establezco las propiedades admitidas para los cabezales
	this.permisos = function(req, res, next){
		/*var whiteList = [
			'http://localhost:4200',
			'http://localhost:4201'
			];
		var origen = req.headers.origin;
		if(whiteList.indexOf(origen) >= -1){
			res.setHeader('Access-Control-Allow-Origin', origen);
		}*/
		//Permito (*) Todos los dominios.
		res.header('Access-Control-Allow-Origin','*');
		//res.header('Access-Control-Allow-Origin','http://localhost:4200');
		res.header('Access-Control-Allow-Headers','Content-Type');
		res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
		next();
	}
}
//Exporto la clase del módulo
module.exports = new AllowCrossDomain();