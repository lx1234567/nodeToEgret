var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessCache = (function () {
    function ChessCache() {
    }
    ChessCache.prototype.initGame = function (obj) {
        var playerInit1 = obj.player1;
        var playerInit2 = obj.player2;
        if (playerInit1.playerId == this.selfInfo.playerId) {
            this.selfInitInfo = playerInit1;
            this.elseInitInfo = playerInit2;
            this.elseInfo = new msg.SPlayerInfo();
            this.elseInfo.playerId = playerInit2.playerId;
        }
        else {
            this.selfInitInfo = playerInit2;
            this.elseInitInfo = playerInit1;
            this.elseInfo = new msg.SPlayerInfo();
            this.elseInfo.playerId = playerInit1.playerId;
        }
    };
    return ChessCache;
}());
__reflect(ChessCache.prototype, "ChessCache");
//# sourceMappingURL=ChessCache.js.map