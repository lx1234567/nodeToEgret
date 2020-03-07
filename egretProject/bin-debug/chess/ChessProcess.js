var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessProcess = (function () {
    function ChessProcess() {
        this._chessBoard = new ChessBoard();
    }
    ChessProcess.prototype.startGame = function (parent) {
        this._chessBoard.init();
        parent.addChild(this._chessBoard);
    };
    return ChessProcess;
}());
__reflect(ChessProcess.prototype, "ChessProcess");
