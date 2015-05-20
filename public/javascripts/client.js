Client = {};


//Connect to the given namespace
Client.connect = function(ns) {
	return io.connect('http://localhost:3000/');
}

Client.Lobby = ( function() {

	var pub = {};
	var roomListElem = undefined;

	pub.setup = function(el) {
		$.ajax('/roomlist').done(function(data) {
			el.html(data);
		});

		roomListElem = el;
	};

	return pub; 
})();
