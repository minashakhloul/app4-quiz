

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
	this.io    = io;
	this.rooms = [];

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

Room.prototype.removePlayer = function( _id ) {

	var i = 0;
	while(i < this.players.length && this.players[i].id !== _id) {
		i++;
	}
	if(i < this.players.length)
		this.players.slice(i, 1);
};

RoomManager.prototype.add = function(room) {
	this.rooms.push(room);
};

RoomManager.prototype.getAll = function() {
	return this.rooms;
};

exports.Manager = RoomManager;
exports.Room = Room;
