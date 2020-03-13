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
        this._chessBoard.x = ChessGlobalData.cellSize / 2;
        this._chessBoard.y = ChessGlobalData.cellSize / 2 + 50;
        Dispatcher.addEventListener(EventName.MoveChessSuc, this.onMoveChessSuc, this);
    };
    ChessProcess.prototype.stageClick = function (e) {
        if (this._chessBoard) {
            if (this._isSelectedChess) {
                this._isSelectedChess = this._chessBoard.onSecondClickChessBoard(e);
            }
            else {
                this._isSelectedChess = this._chessBoard.onFirstClickChessBoard(e);
            }
        }
    };
    ChessProcess.prototype.onMoveChessSuc = function (e) {
        this._chessBoard.onMoveChessSuc(e);
    };
    return ChessProcess;
}());
__reflect(ChessProcess.prototype, "ChessProcess");
//# sourceMappingURL=ChessProcess.js.map