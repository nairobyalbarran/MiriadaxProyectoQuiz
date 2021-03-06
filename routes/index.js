var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Quiz', errors: []});
});

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author');
});

router.get('/quizes/question',            quizController.question);
router.get('/quizes/answer',              quizController.answer);
router.get('/quizes',                     quizController.index);
router.get('/quizes:quizId(\\d+)',        quizController.show);
router.get('/quizes:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                 quizController.new);
router.get('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  quizController.edit);
router.put('/quizes/:quizId(\\d+)',       quizController.update);
router.delete('/quizes/:quizId(\\d+)',       quizController.destroy);
module.exports = router;