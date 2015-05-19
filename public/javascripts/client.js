Client = {};


//Connect to the given namespace
Client.connect = function(ns) {
	return io.connect('http://localhost:3000/');
}

Client.Lobby = ( function() {

	var pub = {};

	pub.getRooms = function(cb) {
		$.getJSON('/roomlist', cb);
	};

	return pub; 
})();
