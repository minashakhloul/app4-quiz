/**
 * Created by yazid on 20/05/15.
 */

var players = require('../services/players');

var io;

exports.init = function(_io, _list){
    io = _io;
};


exports.newPlayer = function(req, res){

    var sess = req.session;

    if(req.method === "GET") {

        if(!sess.player) {  res.redirect('/');  }
        else {              res.redirect('/game');  }
    }
    else {

        if(!req.body.nickname) {    res.redirect('/');  }
        else {

            if (!sess.player) {
                var p = new players.Player(req.body.nickname);
                sess.player = p;
            }
            res.redirect('/game');
        }
    }



};

