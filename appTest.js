/**
 * Module dependencies.
 */

var express = require('express')
    , home = require('./routes/index')
    , expressSession = require('express-session')
    , bodyParser     = require('body-parser')
    , cookieParser   = require('cookie-parser')
    , QuizTimerControllerTest = require('./routes/QuizTimerControllerTest');

var lobbyController = require('./routes/lobby-controller');
var quizController = require('./routes/quiz-controller');
var databaseTest = require('./routes/databaseTest')

//var app = module.exports = express.createServer();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Configuration



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.get('/session', function (req, res, next) {
    console.log(req.session);
    if(!req.session.count) {
        req.session.count = 0;
    }
    req.session.count++;
    res.send('count  : ' + req.session.count + ' id:' + req.sessionID);
});

lobbyController.initManager(io);

app.get('/quizTimerTest',QuizTimerControllerTest.test);
app.get('/startTest', databaseTest.startTest)
app.get('/testDb', databaseTest.testDb)



io.on('connection', function(socket) {
    //console.log(" a user connected:  " +  socket.id );
});


var nsp_quiz = io.of('/quiz');

nsp_quiz.on('connection', function(clientSocket){
    console.log('someone connected to start the Quiz: ' + clientSocket.id);
    clientSocket.emit('startQ', {q : "question"});

});



server.listen(3001);
