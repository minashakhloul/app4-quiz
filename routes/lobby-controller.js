var rooms = require('../services/rooms');

var io;
var manager = undefined;

exports.initManager = function(__io) {
	io = __io;
	manager = new rooms.Manager(io);

	console.log("RoomManager initialized");
 };

exports.game = function(req, res) {
	res.render('game', { title: 'Game'})
}

exports.roomlist = function(req, res) {
	res.send(manager.getAll());
}