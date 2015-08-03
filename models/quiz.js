module.export = function(sequelize, DataType){
	return sequelize.define(
	'Quiz',
	{ pregunta:{
		type: DataType.STRING,
		validate: {notEmpty: {msg: "-> Falta Pregunta"}}
		},
	  respuesta: {
		type: DataType.String,
		validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		}
	  }
	);
}