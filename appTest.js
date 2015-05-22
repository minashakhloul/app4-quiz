/**
 * Module dependencies.
 */

var express = require('express')
    , home = require('./routes/index')
    , expressSession = require('express-session')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , QuizTimerControllerTest = require('./routes/QuizTimerControllerTest')
    , databaseTest = require('./routes/databaseTest')
    , adminPanel = require('./routes/adminPanel');

var lobbyController = require('./routes/lobby-controller');
var quizController = require('./routes/quiz-controller');
var mongoDB = require('mongodb');
var mongoClient = mongoDB.MongoClient;
var database = require('./services/database');
var db = new database.Database(mongoClient, 'mongodb://localhost:27017/quiz');

//var app = module.exports = express.createServer();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.get('/session', function (req, res, next) {
    console.log(req.session);
    if (!req.session.count) {
        req.session.count = 0;
    }
    req.session.count++;
    res.send('count  : ' + req.session.count + ' id:' + req.sessionID);
});

lobbyController.initManager(io);
adminPanel.init(db);

db.afterConnect = function (errorAfterConnect) {
    if (errorAfterConnect) {
        console.log('Error connection: ' + errorAfterConnect);
    }
    else {
        //was tested
        //console.log(db);
        app.get('/quizTimerTest', QuizTimerControllerTest.test);
        app.get('/startTest', databaseTest.startTest);
        app.get('/testDb', databaseTest.testDb);
        app.get('/adminPanel', adminPanel.home);
        app.get('/createQuiz', adminPanel.createQuiz);
        app.post('/listOfQuestions', adminPanel.listOfQuestions);
        app.post('/insertQuiz', adminPanel.insertQuiz);


        io.on('connection', function (socket) {
            //console.log(" a user connected:  " +  socket.id );
        });

        var nsp_quiz = io.of('/quiz');

        nsp_quiz.on('connection', function (clientSocket) {
            console.log('someone connected to start the Quiz: ' + clientSocket.id);
            clientSocket.emit('startQ', {q: "question"});

        });

        server.listen(3001);
    }
};

db.connect(db.mongoClient, db.url);