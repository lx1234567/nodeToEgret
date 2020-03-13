class ChessProcess {
	public constructor() {
		this._chessBoard = new ChessBoard();
	}

	public _chessBoard:ChessBoard;

	private _isSelectedChess:boolean;

	public startGame(parent:egret.DisplayObjectContainer){
		this._chessBoard.init();
		parent.addChild(this._chessBoard);
		this._chessBoard.x =  ChessGlobalData.cellSize / 2;
		this._chessBoard.y =  ChessGlobalData.cellSize / 2 + 50;

		Dispatcher.addEventListener(EventName.MoveChessSuc,this.onMoveChessSuc,this);
	}

	public stageClick(e:egret.TouchEvent){
		if(this._chessBoard){
			if(this._isSelectedChess){
				this._isSelectedChess = this._chessBoard.onSecondClickChessBoard(e);
			}
			else{
				this._isSelectedChess = this._chessBoard.onFirstClickChessBoard(e);
			}
		}
	}

	private onMoveChessSuc(e:egret.Event){
		this._chessBoard.onMoveChessSuc(e);
	}
}