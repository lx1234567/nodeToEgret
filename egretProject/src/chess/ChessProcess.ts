class ChessProcess {
	public constructor() {
		this._chessBoard = new ChessBoard();
	}

	public _chessBoard:ChessBoard;

	public startGame(parent:egret.DisplayObjectContainer){
		this._chessBoard.init();
		parent.addChild(this._chessBoard);
	}
}