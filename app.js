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

io.on('connection', function(socket) {
	//console.log(" a user connected:  " +  socket.id );
});



var nsp_quiz = io.of('/quiz');
nsp_quiz.on('connection', function(clientSocket){

  console.log('someone connected to start the Quiz: ' + socket.id);

  clientSocket.emit();

});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

function getRandomArray( array1, array2 ) {
  var tmp = array1.concat(array2);
  var result = new Array(tmp.length);

  for( var i = 0; i < result.length; i++ ) {
    var rand = Math.floor((Math.random() * (tmp.length - 1)) + 0);
    result[i] = tmp[rand];
    tmp.splice(rand, 1);
  }
  return result;
}
