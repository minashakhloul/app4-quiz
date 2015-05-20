function Room(name, maxPlayer, quiz) {
	this.name = name;
	this.maxPlayer = maxPlayer;
	this.quiz = quiz;
}

function RoomManager() {
	this.rooms = [];

	this.add({top: 'lel'});
}

RoomManager.prototype.add = function (room) {
	this.rooms.push(room);
};

RoomManager.prototype.getAll = function () {
	return this.rooms;
};

exports.Manager = RoomManager;
