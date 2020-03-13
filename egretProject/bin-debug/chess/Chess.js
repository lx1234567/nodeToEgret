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
    Chess.prototype.initChess = function (colorIndex, chessIndex) {
        this._chessBg = new egret.Bitmap();
        this.addChild(this._chessBg);
        this.width = this.height = ChessGlobalData.cellSize;
        this._chessBg.width = this._chessBg.height = this.width;
        this._colorIndex = colorIndex;
        this._chessIndex = chessIndex;
        var texture = RES.getRes("chess_" + this._colorIndex + "_" + this._chessIndex + "_png");
        this._chessBg.texture = texture;
    };
    Chess.prototype.setPoint = function (point) {
        this._point = point;
        this.x = point.x * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
        this.y = point.y * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
    };
    Chess.prototype.getChessX = function () {
        return this._point.x;
    };
    Chess.prototype.getChessY = function () {
        return this._point.y;
    };
    Chess.prototype.setChessIsSelected = function (value) {
        if (this._isSelected == value) {
            return;
        }
        this._isSelected = value;
        if (value) {
            if (!this._chessSelectedImg) {
                this._chessSelectedImg = new egret.Bitmap();
                var texture = RES.getRes("r_box_png");
                this._chessSelectedImg.texture = texture;
                this._chessSelectedImg.width = this._chessSelectedImg.height = this.width;
                this._chessSelectedImg.x = this._chessSelectedImg.y = 0;
                this.addChild(this._chessSelectedImg);
            }
            this._chessSelectedImg.visible = true;
        }
        else {
            if (this._chessSelectedImg) {
                this._chessSelectedImg.visible = false;
            }
        }
    };
    Chess.prototype.getChessIsSelected = function () {
        return this._isSelected;
    };
    Chess.prototype.getChessType = function () {
        return this._chessIndex;
    };
    return Chess;
}(egret.DisplayObjectContainer));
__reflect(Chess.prototype, "Chess");
//# sourceMappingURL=Chess.js.map