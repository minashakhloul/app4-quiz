var idPlayer = 0;

function Player( nickname, sessionId) {

    this.socket = undefined;
    this.id         = idPlayer++;
    this.nickname   = nickname;
    this.sessionId  = sessionId;
}

exports.Player = Player;