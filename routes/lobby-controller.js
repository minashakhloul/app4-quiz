var rooms = require('../services/rooms');

var io;
var manager = undefined;

exports.initManager = function(__io) {
	io = __io;
	manager = new rooms.Manager(io);

	// add some random rooms

	console.log("RoomManager initialized");
 };

exports.game = function(req, res) {
	res.render('game', { title: 'Game'})
}

exports.roomlist = function(req, res) {
	console.log(manager.getAll());
	res.render('roomlist', { rooms : manager.getAll(), layout : false } )
}

exports.newroom = function(req, res) {
	console.log('creating room');
	console.log(req.params);
}