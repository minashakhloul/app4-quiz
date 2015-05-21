
var io;

exports.getQuestion = function(req, res){
    //console.log(req.body);
    var newQ = {q: "question's title",
                nbAnswers: 2,
                prop: [
                    {s: "prop1", value: false},
                    {s: "prop2", value: true},
                    {s: "prop3", value: true},
                    {s: "prop4", value: false}
                ]
    };
    res.render('question', {tmp : newQ, layout : false});
};

exports.quiz = function(req, res){
    //console.log(JSON.stringify(req.param));
    res.render('quiz', { title: 'Quiz', idSession : 0 })
};

exports.waitingQuiz = function(req, res) {
    console.log("Wainting quiz");
    res.send('waiting for the other players');
};