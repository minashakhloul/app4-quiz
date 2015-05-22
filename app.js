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
var loginController = require('./routes/login-controller');
var mongoClient       = mongoDB.MongoClient;
var dataBaseModule    = require('./services/database');
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


var nsp_quiz = io.of('/quiz');
var nsp_waitQuiz = io.of('/waitQuiz');

lobbyController.initManager(io, db);
playersController.init(io);
quizController.init(nsp_quiz, nsp_waitQuiz, lobbyController.getManager());


db.afterConnect = function(errorAfterConnect) {
    if( errorAfterConnect ) {
        console.log('Error connection: ' + errorAfterConnect);
    }
    else {
        app.get('/', home.index);
        app.all('/newPlayer', playersController.newPlayer);
        app.get('/quiz/:id', quizController.quiz);
        app.get('/quizStart/:id', quizController.quizStart);
        app.get('/getQuestion/:id', quizController.getQuestion);
        app.post('/answer', quizController.answer);
        
        app.get('/game', lobbyController.game);
        app.get('/roomlist', lobbyController.roomlist);
        app.post('/newroom', lobbyController.newroom);
        app.get('/waitingQuiz/:id', quizController.waitingQuiz);

        server.listen(3000);
    }

};

db.connect(db.mongoClient, db.url);

// Routes





