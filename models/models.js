var path = require ('path');
}

//Cargar Modelo ORM

var Sequelize = require ('sequelize');

// Usar BBDD SQlite

var Sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite", storage: "quiz.sqlite"});
			
//Importar la definición de la tabla QUiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

export.Quiz = Quiz;

sequelize.sync().success(function(){
	Quiz.count().success(function(count){
		if(count=== 0){
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma'
						}). success (function(){console.log("Base de datos inicializada");}
		};
	});
});