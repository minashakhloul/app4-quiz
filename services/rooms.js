var scoring = require('./quiz-eval');

function Room( id, maxPlayer, master, quiz ) {

	this.id = id;
	this.maxPlayer 	= maxPlayer;
	this.master = master;
	this.players 	   = [];
	this.playerScores = []; //array of score eval objects
	this.quiz      	= quiz;
	this.status		= "notStarted";
	this.timeoutQ	= -1;
	this.currentQ	= -1;
}

Room.prototype.start = function() {
	if( this.players.length > 0 ) {
		this.status = "started";
		this.timeoutQ = 8000;
		this.currentQ = 0;
	}
	else {
		console.log("no enough players to start the Quiz in room : " + this.id );
	}
};

Room.prototype.addPlayer = function( player ) {
	if( this.players.length < this.maxPlayer ) {
		this.players[player.id] = player;
		this.playerScores[player.id] = new scoring.ScoreCounter( this );
		console.log('created scorer');
	}
};

Room.prototype.submitAnswer = function(playerId, answer) {
   var scorer = this.playerScores[playerId];
   scorer.evaluateCurrentQuestion(answer);
};

Room.prototype.quizEnded = function() {
	//return (this.currentQ == this.quiz.questions.length);
	console.log(this.status);
	return this.status == 'ended';
};

Room.prototype.removePlayer = function( _id ) {

	var i = 0;
	while(i < this.players.length && this.players[i].id !== _id) {
		i++;
	}
	if(i < this.players.length)
		this.players.slice(i, 1);
};

function RoomManager(io) {
	this.io    = io;
	this.rooms = [];
}

RoomManager.prototype.getRoom = function(_id) {
	var i = 0;
	while( i < this.rooms.length && this.rooms[i].id != _id) {
		i++;
	}
	if(i < this.rooms.length)
		return this.rooms[i];
	else
		return null;
};

RoomManager.prototype.add = function(room) {
	this.rooms.push(room);
};

RoomManager.prototype.getAll = function() {
	return this.rooms;
};

exports.Manager = RoomManager;
exports.Room = Room;
