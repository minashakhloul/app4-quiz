/**
 * Created by mina on 20/05/15.
 */

var mongodb = require('mongodb')
    , database = require('./../database');
var io;

exports.setIO = function (_io) {
    io = _io;
};

exports.startTest = function (req, res) {
    res.render('databaseStartTestView', {title: 'Database Test'});
}

exports.testDb = function (req, res) {
    var mongoClient = mongodb.MongoClient;
    var db = new database.Database(mongoClient, 'mongodb://localhost:27017/quiz');
    //we have to define what to do in case of the async call for connection to DB
    var result = '';
    db.afterConnect = function () {
        var prop1 = new database.Prop("prop1", 0);
        var prop2 = new database.Prop("prop1", 1);
        var q1 = new database.Question("Question 1", [prop1, prop2]);
        var q2 = new database.Question("Question 2", [prop1, prop2]);
        var quiz = {title: 'quiz1', questions: [q1, q2]};
        //db.insertQuiz(quiz, 'quizList');
        db.selectAllQuizes('quizList', function (data) {
            console.log(JSON.stringify(data));
            res.render('databaseTestView', {title: 'Result', quizes: data, layout: false});
        });

        db.selectAllQuizesIds('quizList', function (data) {
            console.log(JSON.stringify(data));
            //res.render('databaseTestView', {title: 'Result', quizesIds: data, layout: false});
        });

        db.selectQuiz(mongodb, '555b921aad41f88e2b2fd217', 'quizList', function (data) {
            console.log(JSON.stringify(data));
            //res.render('databaseTestView', {title: 'Result', quiz: data, layout: false});
        });

        //db.connection.close(); it's closed before we call the functions so we'll errors!!
    }

    db.connect(db.mongoClient, db.url);

}
