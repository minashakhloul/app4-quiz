

var timer = require('../services/QuizTimer');
var nspQuiz;
var nspWaitQuiz;
var manager = undefined;

function setupSocketIo() {
    nspQuiz.on('connection', function(clientSocket){
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

function setupWaitSocketIo() {

    nspWaitQuiz.on('connection', function(clientSocket){

        console.log('someone connected to start the Quiz: ' + clientSocket.id);

         clientSocket.on('join', function(data) {
             console.log("-----Client connected and waiting for the start in room : " + data.id);
             clientSocket.join('wRoom-'+data.id);
         });
    });
}


exports.init = function(_nspQuiz, _nspWaitQuiz, _manager){
    nspQuiz = _nspQuiz;
    nspWaitQuiz = _nspWaitQuiz
    manager = _manager;

    setupSocketIo();
    setupWaitSocketIo();
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

        nspWaitQuiz.to('wRoom-' + room.id).emit('startQuiz');

        room.start();

        timerManager.onEndOfQuestion = function ( question , room ) {
            nspQuiz.to('room-' + room.id).emit('sync');
        };

        timerManager.onEndOfQuiz =  function ( room ) {
            console.log("quiz ending " );
            console.log(room.playerScores);
        };

        timerManager.start();

    } else {
    	res.send('cannot start quiz if you are not the master');
	}
};

exports.answer = function(req, res) {
   var answer = req.body['answer[]'];
   var room   = manager.getRoom(req.body.room);
   var player = req.session.player;
   
   
   room.submitAnswer(player.id, answer);
   
   res.send('ok');
}

exports.waitingQuiz = function(req, res) {

    var room = manager.getRoom(req.params.id);
    console.log("Wainting quiz; room = " + room);
    if( room === null ) {
        res.status(500).send("Room's id not found");
    }
    else {
        room.addPlayer(req.session.player);
        res.render('waitingQuiz', {title: "Waiting for players", room: room, player: req.session.player});
    }

};
