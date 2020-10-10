var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChessProxy = (function (_super) {
    __extends(ChessProxy, _super);
    function ChessProxy() {
        return _super.call(this) || this;
    }
    ChessProxy.prototype.addCmds = function () {
        _super.prototype.addCmds.call(this);
        this.onProto("msg.S2CInitGame", this.onInitGame);
        this.onProto("msg.S2CPlayMoveChess", this.onSMoveChess);
    };
    ChessProxy.prototype.onInitGame = function (obj) {
        GameCache.chessCache.initGame(obj);
        Dispatcher.dispatchEvent(EventName.InitGame);
    };
    ChessProxy.prototype.onMoveChess = function (originalPos, movePos) {
        var obj = new msg.C2SMoveChess();
        var info = new msg.SChessMoveInfo();
        info.chessPos = originalPos;
        info.movePos = movePos;
        info.playerId = GameCache.chessCache.selfInfo.playerId;
        obj.info = info;
        Outgoing.send("msg.C2SMoveChess", obj);
    };
    ChessProxy.prototype.onSMoveChess = function (obj) {
        var moveInfo = obj.info;
        Dispatcher.dispatchEvent(EventName.MoveChessSuc, moveInfo);
    };
    return ChessProxy;
}(BaseProxy));
__reflect(ChessProxy.prototype, "ChessProxy");
//# sourceMappingURL=ChessProxy.js.map