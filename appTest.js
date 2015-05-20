/**
 * Created by Nabil on 5/20/2015.
 */
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes');

var lobbyController = require('./routes/lobby-controller')
var QuizTimerControlerTest = require('./routes/QuizTimerControllerTest')
//var app = module.exports = express.createServer();
var app = express.createServer();
var io = require('socket.io')(app);
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

// *********  Routes ********* //
app.get('/', routes.index);
app.get('/poke', routes.poke);
app.get('/peek', routes.peek);
app.get('/roomlist', lobbyController.roomlist);
app.get('/quizTimerTest', QuizTimerControlerTest.test);

// *********  Launch ********* //

app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});