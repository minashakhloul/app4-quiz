/**
 * Created by Nabil on 5/20/2015.
 */

var Timer = require('../services/QuizTimer.js');
var io;

var quiz = {title : 'lol' , questions : [ " q1  ", " q2" , "q3" , "q4" ]};
var room = { id : 10 , currentQ : -1 , timeoutQ : 1000 , quiz : quiz  };

var quizeTimer = new Timer.Manager(room);

quizeTimer.onBeginOfQuestion = function ( question , room ){
    console.log( "begin  " + question  );
};

quizeTimer.onEndOfQuestion = function ( question , room ){
    console.log( "ending  " + question  );
};

quizeTimer.onEndOfQuiz = function ( room ){
    console.log( "ending the Quiz "  );
};
// public

exports.setIO = function( _io){ io = _io;};

exports.test = function(req, res){
    res.render('QuizTimerTestView', { title: 'Quiz Timer Test' });
    quizeTimer.start();
};