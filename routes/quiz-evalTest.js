/**
 * Created by Nabil on 5/21/2015.
 */


var quizEval = require("../services/quiz-eval");


var room = { quiz : {questions:[
        {prop :[{value : true  },{value : false},{value : false}]},
        {prop :[{value : false },{value : true },{value : false}]},
        {prop :[{value : false },{value : false},{value : true }]},
        {prop :[{value : true  },{value : false},{value : true }]},
        {prop :[{value : false },{value : true },{value : false}]}
                ]} , currentQ: 0};

var eval = new quizEval.evaluateur(room);

eval.evaluateCurrentQuestion([true  , false , false ]);
room.currentQ ++;
eval.evaluateCurrentQuestion([false , true  , false ]);
room.currentQ ++;
eval.evaluateCurrentQuestion([false , false , true  ]);
room.currentQ ++;
eval.evaluateCurrentQuestion([true  , false , true  ]);
room.currentQ ++;
eval.evaluateCurrentQuestion([false , true  , false ]);
room.currentQ ++;


exports.test = function(req, res){
    res.render('onConsoleTestView', { title: 'Quiz Eval Test' });

    console.log( eval.score);
};