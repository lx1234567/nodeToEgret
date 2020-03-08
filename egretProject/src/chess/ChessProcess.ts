class ChessProcess {
	public constructor() {
		this._chessBoard = new ChessBoard();
	}

	public _chessBoard:ChessBoard;

	public startGame(parent:egret.DisplayObjectContainer){
		this._chessBoard.init();
		parent.addChild(this._chessBoard);
		this._chessBoard.x =  ChessGlobalData.cellSize / 2;
		this._chessBoard.y =  ChessGlobalData.cellSize / 2;
	}

	public stageClick(e:egret.TouchEvent){
		if(this._chessBoard){
			this._chessBoard.onClickChessBoard(e);
		}
	}
}