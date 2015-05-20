/**
 * Module dependencies.
 */

var express = require('express')
  , home = require('./routes/index');

var lobbyController = require('./routes/lobby-controller');
var quizController = require('./routes/quiz-controller');

//var app = module.exports = express.createServer();
var app = express.createServer();
var io = require('socket.io')(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

lobbyController.initManager(io);


// Routes
app.get('/', home.index);
app.get('/quiz', quizController.quiz);
app.get('/getQuestion', quizController.getQuestion);

app.get('/roomlist', lobbyController.roomlist);
app.post('/newroom', lobbyController.newroom);

io.on('connection', function(socket) {
	//console.log(" a user connected:  " +  socket.id );
});

app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});



var nsp_quiz = io.of('/quiz');

nsp_quiz.on('connection', function(clientSocket){
  console.log('someone connected to start the Quiz: ' + clientSocket.id);
  clientSocket.emit('startQ', {q : "question"});

});



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

