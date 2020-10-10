var outgoing = require("./../Outgoing");
var GameCache = require("./../GameCache");
var ProtoBufUtil = require("./../ProtobufUtil");
function ChessProxy(){
    this.addCmds();
}

module.exports = ChessProxy;

ChessProxy.prototype.addCmds = function(){
    outgoing.session.bind("msg.C2SPlayInitInfo",{callObj:this,fun:this.onC2SPlayInitInfo});
    outgoing.session.bind("msg.C2SMoveChess",{callObj:this,fun:this.onMoveChess})
}

ChessProxy.prototype.onC2SPlayInitInfo = function(obj,con){
    GameCache.chessCache.pushPlayer(obj.getPlayerinfo());
    var allplayerInfo = GameCache.chessCache.allPlayerInfo;
    con["playerId"] = obj.getPlayerinfo().getPlayerid();
    if(allplayerInfo.length > 1){
        setTimeout(sendInitPlayerInfoToClient,1000);
    }
}

ChessProxy.prototype.onMoveChess = function(obj,con){
    var moveInfo = obj.getInfo();
    var s2cMove = new proto.msg.S2CPlayMoveChess();
    s2cMove.setInfo(moveInfo);
    console.log("玩家移动棋子.. x:" + moveInfo.getChesspos().getX() + "y:" + moveInfo.getChesspos().getY() + "---> x:" +  moveInfo.getMovepos().getX() + "y:" + moveInfo.getMovepos().getY())
    outgoing.send("msg.S2CPlayMoveChess",s2cMove);
}

function sendInitPlayerInfoToClient(){
    var initGameProxy = new proto.msg.S2CInitGame();
    var allplayerinfo = GameCache.chessCache.allPlayerInfo;

    var player1 = allplayerinfo[0];
    var player2 = allplayerinfo[1];

    var schessInitInfo1 = new proto.msg.SChessInitInfo();
    schessInitInfo1.setPlayerid(player1.getPlayerid());
    schessInitInfo1.setColorindex(1);
    schessInitInfo1.setPosindex(1);

    var schessInitInfo2 = new proto.msg.SChessInitInfo();
    schessInitInfo2.setPlayerid(player2.getPlayerid());
    schessInitInfo2.setColorindex(2);
    schessInitInfo2.setPosindex(2);

    initGameProxy.setPlayer1(schessInitInfo1);
    initGameProxy.setPlayer2(schessInitInfo2);
    console.log("游戏人数达标 向客户端发送初始化游戏的消息...");
    outgoing.send("msg.S2CInitGame",initGameProxy);
}