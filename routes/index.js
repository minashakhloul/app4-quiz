
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Rooms' })
};

exports.quiz = function(req, res){
  res.render('question', { title: 'Quiz', idSession : 0 })
};

exports.poke = function(req, res){
  res.render('poke', { title: 'Poke' })
};

exports.peek = function(req, res){
  res.render('peek', { title: 'Peek' })
};
