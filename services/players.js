var idPlayer = 0;

function Player( nickname) {

    this.id         = idPlayer++;
    this.nickname   = nickname;
}

exports.Player = Player;