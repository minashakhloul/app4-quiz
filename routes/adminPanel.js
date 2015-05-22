/**
 * Created by mina on 20/05/15.
 */

var db;

exports.init = function(_db){
    db = _db;
}

exports.home = function (req, res) {
    res.render('adminPanel', {title: 'Administration Panel'});
};

exports.createQuiz = function (req, res) {
    res.render('createQuiz', {title: 'Create Quiz'});
};

exports.listOfQuestions = function (req, res) {
    res.render('questionBlock', {numberOfQuestions: req.body.numberOfQuestions});
};

exports.insertQuiz = function (req, res) {
    var quiz = JSON.parse(req.body.quiz);
    db.insertQuiz(quiz, "quizList", function( err) {
        if( err ) {
            res.redirect('/createQuiz');
        }
        else {
            res.render('addQuiz', { quiz : quiz });
        }
    });
};
