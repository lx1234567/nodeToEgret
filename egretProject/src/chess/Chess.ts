class Chess extends egret.Bitmap{
	public constructor() {
		super();
	}

	private _playerIndex:number;
	private _chessIndex:number;

	private _point:egret.Point;

	public initChess(playerIndex:number,chessIndex:number){
		this.width = this.height = ChessGlobalData.cellSize;
		this._playerIndex = playerIndex;
		this._chessIndex = chessIndex;

		let texture: egret.Texture = RES.getRes("chess_" + this._playerIndex + "_" + this._chessIndex + "_jpg");
		this.texture = texture;
	}

	public setPoint(point:egret.Point){
		this._point = point;
		this.x = point.x * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2;
		this.y = point.y * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2;
	}
}