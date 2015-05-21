

var timer = require('../services/QuizTimer');
var io;
var manager = undefined;

function setupSocketIo() {
    io.on('connection', function(clientSocket){
        console.log('someone connected to start the Quiz: ' + clientSocket.id);
        
    	clientSocket.on('join', function(data) {
        	console.log("Client connected");
        	console.log(data);
        	// add socket to room here
        	
        	var room = manager.getRoom(data.id);
        	
        	clientSocket.join('room-'+room.id);
        	clientSocket.emit('sync');
    	});
    	
    });

}

exports.init = function(_io, _manager){
    io = _io;
    manager = _manager;

    setupSocketIo();
};

exports.getQuestion = function(req, res){
    //console.log(req.body);
    var room = manager.getRoom(req.params.id);
    if(room == null) {
        res.status(404).send('room not available');
    }
    else {
        console.log('currentQ = ' + room.currentQ);
        console.log(room.quiz);
        var question = room.quiz.questions[room.currentQ];

        if(!question) {
            res.status(404).send('question not found');
        } else {
            res.render('question', {newQ: question, layout: false});
        }
    }

};

exports.quiz = function(req, res){
    //console.log(JSON.stringify(req.param));
    var room = manager.getRoom(req.params.id);
    if(room == null) {
        res.status(404).send("no such room");
    } else {
        res.render('quiz', { title: 'Quiz', player: req.session.player, idRoom: room.id})
    }

};

exports.quizStart = function(req, res){
    var sess  = req.session;
    var room  = manager.getRoom(req.params.id);
    var timerManager = new timer.Manager(room);


    if( room.master.id === sess.player.id ) {
        room.start();

        timerManager.onEndOfQuestion = function ( question , room ) {
            console.log("question ending " + room.currentQ);
            io.to('room-' + room.id).emit('sync');
        };

        timerManager.start();

        res.redirect('/quiz/' + room.id);
    } else {
    	res.send('cannot start quiz if you are not the master');
	}
};

exports.answer = function(req, res) {
   var answer = req.body;
   var room = manager.getRoom(req.body.room);
   
   console.log(answer);
}

exports.waitingQuiz = function(req, res) {

    var room = manager.getRoom(req.params.id);
    console.log("Wainting quiz; room = " + room);
    if( room === null ) {
        res.status(500).send("Room's id not found");
    }
    else {
        res.render('waitingQuiz', {title: "Waiting for players", room: room, player: req.session.player});
    }

};
