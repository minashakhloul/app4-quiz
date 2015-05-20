/**
 * Created by Nabil on 5/20/2015.
 */
function callBack (quizTimer){
    quizTimer.onEndOfQuestion(quizTimer.room.quiz.questions[quizTimer.room.currentQ] , quizTimer.room);
    quizTimer.room.currentQ++;
    if (quizTimer.room.currentQ < quizTimer.room.quiz.questions.length)
    {
        quizTimer.onBeginOfQuestion(quizTimer.room.quiz.questions[quizTimer.room.currentQ] , quizTimer.room);
        setTimeout(callBack, quizTimer.room.timeoutQ ,quizTimer );
    }else
    {
        quizTimer.onEndOfQuiz( quizTimer.room);
    }
}



function QuizTimer( room ){
    this.room = room ;
    this.onEndOfQuestion = function ( question , room ){};
    this.onBeginOfQuestion = function ( question , room ){};
    this.onEndOfQuiz = function ( room ){};

    this.start = function (){
        console.log ('the Quiz'+this.room.quiz.title+' is stating in room '+ this.room.id);
        this.room.currentQ = 0;
        this.onBeginOfQuestion(this.room.quiz.questions[this.room.currentQ] , this.room);
        setTimeout( callBack, this.room.timeoutQ , this );
    };
}
exports.Manager = QuizTimer ;
