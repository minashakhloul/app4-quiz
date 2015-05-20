/**
 * Module dependencies.
 */

var express = require('express')
    , mongodb = require('mongodb')
    , database = require('./database')
    , routes = require('./routes');

//var app = module.exports = express.createServer();
var app = express.createServer();
var io = require('socket.io')(app);

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/poke', routes.poke);
app.get('/peek', routes.peek);

io.on('connection', function (socket) {
    console.log(" a user connected:  " + socket.id);
    /*socket.on('poke', function(data) {
     console.log(" a user send a poke:  " + JSON.stringify(data) );
     mongoTest.dbConnectionTest(mongodb);
     //socket.broadcast.emit('peek', data);
     });*/
});

var nsp_poke = io.of('/poke');
nsp_poke.on('connection', function (socket) {
    console.log('someone connected to poke: ' + socket.id);
    socket.on('poke', function (data) {
        console.log(" a user send a poke:  " + JSON.stringify(data));
        var mongoClient = mongodb.MongoClient;
        var db = new database.Database(mongoClient, 'mongodb://localhost:27017/quiz');
        //we have to define what to do in case of the async call for connection to DB
        db.afterConnect = function () {
            var prop1 = new database.Prop("prop1", 0);
            var prop2 = new database.Prop("prop1", 1);
            var q1 = new database.Question("Question 1", [prop1, prop2]);
            var q2 = new database.Question("Question 2", [prop1, prop2]);
            var quiz = {title: 'quiz1', questions: [q1, q2]};
            //db.insertQuiz(quiz, 'quizList');
            db.selectAllQuizes('quizList');
            db.selectAllQuizesIds('quizList');
            db.selectQuiz(mongodb, '555b921aad41f88e2b2fd217', 'quizList');

            //db.connection.close(); it's closed before we call the functions so we'll errors!!
        }
        db.connect(db.mongoClient, db.url);
        //socket.broadcast.emit('peek', data);
    });
});

var nsp_peek = io.of('/peek');
nsp_peek.on('connection', function (socket) {
    console.log('someone connected to peek: ' + socket.id);
});

app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
