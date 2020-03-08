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
var Chess = (function (_super) {
    __extends(Chess, _super);
    function Chess() {
        return _super.call(this) || this;
    }
    Chess.prototype.initChess = function (playerIndex, chessIndex) {
        this.width = this.height = ChessGlobalData.cellSize;
        this._playerIndex = playerIndex;
        this._chessIndex = chessIndex;
        var texture = RES.getRes("chess_" + this._playerIndex + "_" + this._chessIndex + "_png");
        this.texture = texture;
    };
    Chess.prototype.setPoint = function (point) {
        this._point = point;
        this.x = point.x * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
        this.y = point.y * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
    };
    return Chess;
}(egret.Bitmap));
__reflect(Chess.prototype, "Chess");
//# sourceMappingURL=Chess.js.map