/**
 * Module dependencies.
 */

var express = require('express')
    , home = require('./routes/index')
    , expressSession = require('express-session')
    , bodyParser     = require('body-parser')
    , cookieParser   = require('cookie-parser')
    , mongoDB        = require('mongodb');

var lobbyController   = require('./routes/lobby-controller');
var quizController    = require('./routes/quiz-controller');
var playersController = require('./routes/players-controller');
var mongoClient       = mongoDB.MongoClient;
var dataBaseModule    = require('./database');
var db                = new dataBaseModule.Database(mongoClient, "mongodb://localhost:27017/quiz");

//var app = module.exports = express.createServer();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Configuration



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


lobbyController.initManager(io, db);
playersController.init(io);

db.afterConnect = function(errorAfterConnect) {
    if( errorAfterConnect ) {
        console.log('Error connection: ' + errorAfterConnect);
    }
    else {
        app.get('/', home.index);
        app.all('/newPlayer', playersController.newPlayer);
        app.get('/quiz', quizController.quiz);
        app.get('/getQuestion', quizController.getQuestion);
        app.get('/game', lobbyController.game);
        app.get('/roomlist', lobbyController.roomlist);
        app.post('/newroom', lobbyController.newroom);
        app.get('/waitingQuiz', quizController.waitingQuiz);
        //app.get('/room:id', );


        io.on('connection', function(socket) {
            //console.log(" a user connected:  " +  socket.id );
        });

        var nsp_quiz = io.of('/quiz');

        nsp_quiz.on('connection', function(clientSocket){
            console.log('someone connected to start the Quiz: ' + clientSocket.id);
            clientSocket.emit('startQ', {q : "question"});

        });

        server.listen(3000);
    }

};

db.connect(db.mongoClient, db.url);

// Routes





