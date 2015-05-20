/**
 * Created by Nabil on 5/20/2015.
 */

var Timer = require('../services/QuizTimer.js');
var io;


// public

exports.setIO = function (_io) {
    io = _io;
};

exports.test = function (req, res) {
    res.render('QuizTimerTestView', {title: 'Quiz Timer Test'});
};