Client = {};


//Connect to the given namespace
Client.connect = function (ns) {
    return io.connect('http://localhost:3000/');
}

Client.Lobby = (function () {

    var pub = {};

    pub.getRooms = function (el) {
        $.ajax('/roomlist').done(function (data) {
            el.html(data);
        });
    };

    return pub;
})();
