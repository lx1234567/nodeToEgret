var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameProxy = (function () {
    function GameProxy() {
    }
    GameProxy.init = function () {
        GameProxy.chessProxy = new ChessProxy();
    };
    return GameProxy;
}());
__reflect(GameProxy.prototype, "GameProxy");
//# sourceMappingURL=GameProxy.js.map