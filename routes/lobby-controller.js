var rooms = require('../services/rooms');
var player = require('../services/players');
var player = require('../services/players');
var mongodb = require('mongodb');

var io;
var db;
var manager = undefined;
var idRoom = 0;

exports.initManager = function(__io, __db) {
	io = __io;
	db = __db;
	manager = new rooms.Manager(io);

	// add some random rooms

	console.log("RoomManager initialized");
 };

exports.game = function(req, res) {
	db.selectAllQuizes("quizList", function( err, allQuizes ) {
		if( err ) {
			console.log('Error get all quizes: ' + err );
			res.redirect('/game');
		}
		else {
			console.log('Get all quizes: ' + allQuizes );
			res.render('game', { title: 'Game', allQuizes : allQuizes });
		}
	});

}

exports.roomlist = function(req, res) {
	console.log("All rooms: " + manager.getAll());
	res.render('roomlist', { rooms : manager.getAll(), layout : false } )
}

exports.newroom = function(req, res) {
	console.log('creating room');
	var sess = req.session;
	//console.log('params: ' + JSON.stringify(req.body));

	db.selectQuiz(mongodb, req.body.quizID, "quizList", function( err, quiz ){
		if( err ) {
			console.log('Error adding new room: ' + err );
			res.redirect('/game');
		}
		else {
			var players = [];
			players[sess.id] = new player.Player(sess.player.nickname);
			manager.add( new rooms.Room(idRoom++, req.body.nbPlayers, players, quiz) );
			console.log("Updated rooms: " + manager.getAll() + "; Redirection to waintingQuiz");
			res.redirect('/waitingQuiz');
		}
	});



}