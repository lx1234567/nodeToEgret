var ChessProcess = /** @class */ (function () {
    function ChessProcess() {
        this._chessBoard = new ChessBoard();
    }
    ChessProcess.prototype.startGame = function (parent) {
        this._chessBoard.init();
        parent.addChild(this._chessBoard);
    };
    return ChessProcess;
}());
