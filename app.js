/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var lobbyController = require('./routes/lobby-controller')

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
app.get('/', routes.index);
app.get('/quiz', routes.quiz);
//app.get('/poke', routes.poke);
//app.get('/peek', routes.peek);

app.get('/roomlist', lobbyController.roomlist);

io.on('connection', function(socket) {
	console.log(" a user connected:  " +  socket.id );
    /*
    socket.on('poke', function(data) {
		console.log(" a user send a poke:  " + JSON.stringify(data) );
		socket.broadcast.emit('peek', data);
	});
	*/
});

var nspQuiz = io.of('/quiz');
nspQuiz.on( 'connection', function(socket) {
  console.log( 'someone connected to quiz : ' + socket.id );
  socket.on( 'reqQ', function(data) {
    console.log( " a user send a request; idSession:  " + data.id );
    var newQ = { title : "question's title", suggestions: getRandomArray(["good1","good2"], ["bad1","bad2"]) };
    socket.emit( "newQuestion", newQ );
  });
});

var nsp_poke = io.of('/poke');
nsp_poke.on('connection', function(socket){
  console.log('someone connected to poke: ' + socket.id);
  socket.on('poke', function(data) {
    console.log(" a user send a poke:  " + JSON.stringify(data) );
    socket.broadcast.emit('peek', data);
  });
});

var nsp_peek = io.of('/peek');
nsp_peek.on('connection', function(socket){
  console.log('someone connected to peek: ' + socket.id);

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
