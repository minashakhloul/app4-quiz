/**
 * Created by mina on 20/05/15.
 */

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
    console.log(req.body.quiz);
    res.render('addQuiz', {quiz: req.body.quiz});
};
