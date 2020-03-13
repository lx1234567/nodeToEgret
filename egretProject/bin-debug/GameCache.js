var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameCache = (function () {
    function GameCache() {
    }
    GameCache.chessCache = new ChessCache();
    return GameCache;
}());
__reflect(GameCache.prototype, "GameCache");
//# sourceMappingURL=GameCache.js.map