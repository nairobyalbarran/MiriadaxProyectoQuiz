module.export = function(sequelize, DataTypes){
	return sequelize.define(
	'Quiz',
	{ pregunta:{
		type: DataType.STRING,
		validate: {notEmpty: {msg: "-> Falta Pregunta"}}
		},
	  respuesta: {
		type: DataType.STRING,
		validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		}
	  }
	);
}