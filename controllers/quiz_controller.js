//GET /quizes
export.index = function(req, res) {
	models.Quiz.findAll(). then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error)});
}

//GET /quizes/:id
export.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors:[]});
}

// GET /quizes/:id/answer
export.answer = function(req, res){
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


// GET /quizes/question
exports.question = function (req, res) {
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function (req, res) {
    if (req.query.respuesta === 'Roma') {
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
};

// GET /quizes/new
export.new = function(req, res){
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

export.new = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}). then(function(){
		res.redirect(/quizes);
	})//Redirección HTTP (URL realtivo) lista de preguntas
};

//GET quizes edit/:id/edit

export.edit = function(req, res){
	var quiz = req.quiz; // autoload de instance quiz
	res.render('quizes/edit', {quiz: quiz, errors:[]});
}

//PUT /quizes/:id
export.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quiz/edit', {quiz: req.quiz, errors: err.errors}});
			}else{
				req.quiz // save: guarda campo pregunta y respuesta
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){ res.redirect('/quizes');});
			}  //Redirect HTTP a la lista de preguntas (URL relativo)
		 }
	);
};