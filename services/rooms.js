

function Room( id, maxPlayer, players, quiz ) {

	this.id = id;
	this.maxPlayer 	= maxPlayer;
	this.players 	= players;
	this.quiz      	= quiz;
	this.status		= "notStarted";
	this.timeoutQ	= -1;
	this.currentQ	= -1;
}

function RoomManager(io) {
	this.rooms = [];

	this.add({ top : 'lel'});
}

Room.prototype.start = function() {
	if( this.players.length > 0 ) {
		this.status = "started";
		this.timeoutQ = 15;
		this.currentQ = 0;
	}
	else {
		console.log("no enough players to start the Quiz in room : " + this.id );
	}
};

Room.prototype.addPlayer = function( player ) {
	if( this.players.length < this.maxPlayer ) {
		this.players[player.id] = player;
	}
};

Room.prototype.removePlayer = function( id ) {
	this.players.slice(id, 1);
};

RoomManager.prototype.add = function(room) {
	this.rooms.push(room);
};

RoomManager.prototype.getAll = function() {
	return this.rooms;
};

exports.Manager = RoomManager;
exports.Room = Room;
