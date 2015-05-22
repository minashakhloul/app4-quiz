/**
 * Created by mina on 21/05/15.
 */


Model = (function () {
    var pub = {};

    pub.Prop = function (s, value) {
        this.s = s;
        this.value = value;

    };
    pub.Question = function (title, prop) {
        this.q = title;
        this.prop = prop;
        this.nbAnswers = 0;
        for (var i = 0; i < prop.length; ++i) {
            if (prop[i].value)
                this.nbAnswers++;
        }
    };
    pub.Quiz = function (title, questions) {
        this.title = title;
        this.questions = questions;

        this.addQuestion = function (question) {
            this.questions.push(question);
        }

        this.setTitle = function (title) {
            this.title = title;
        }
    };

    return pub;
})();