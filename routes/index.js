
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Rooms' })
};

exports.poke = function(req, res){
  res.render('poke', { title: 'Poke' })
};

exports.peek = function(req, res){
  res.render('peek', { title: 'Peek' })
};
