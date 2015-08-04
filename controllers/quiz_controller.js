var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error)});
}

//GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors:[]});
}

// GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado= 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render(
	'quizes/answer',
	{quiz: req.quiz,
	 respuesta: resultado,
	 errors: []
	 }
	);
};

//DELETE / quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
}

// GET /quizes/question
exports.question = function (req, res) {
	models.Quiz.findAll().then(function(quiz){
	    res.render('quizes/question', {pregunta: quiz[0].pregunta});
	}
)
};

// GET /quizes/answer
exports.answer = function (req, res) {
	models.Quiz.findAll().then(function(quiz){
		if (req.query.respuesta === 'Roma') {
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
	});
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(//crea objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}else{
				quiz// save: guarda en DB campos pregunta y respuesta quiz
				.save({fields:["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes')})
			} //res.redirect: Redirección HTTP a lista de preguntas
		}
	);
	//res.render('quizes/new', {quiz:quiz, errors: []});
};


//POST /quizes/create

exports.new = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}). then(function(){
		res.redirect('/quizes');
	})//Redirección HTTP (URL relativo) lista de preguntas
};

//GET quizes edit/:id/edit

exports.edit = function(req, res){
	var quiz = req.quiz; // autoload de instance quiz
	res.render('quizes/edit', {quiz: quiz, errors:[]});
}

//PUT /quizes/:id
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quiz/edit', {quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz // save: guarda campo pregunta y respuesta
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){ res.redirect('/quizes');});
			}  //Redirect HTTP a la lista de preguntas (URL relativo)
		 }
	);
};