class Chess extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	private _chessBg: egret.Bitmap;
	private _chessSelectedImg: egret.Bitmap;

	private _colorIndex: number;
	private _chessIndex: number;

	private _point: egret.Point;

	private _isSelected: boolean;

	public initChess(colorIndex: number, chessIndex: number) {
		this._chessBg = new egret.Bitmap();
		this.addChild(this._chessBg);
		this.width = this.height = ChessGlobalData.cellSize;
		this._chessBg.width = this._chessBg.height = this.width;
		this._colorIndex = colorIndex;
		this._chessIndex = chessIndex;

		let texture: egret.Texture = RES.getRes("chess_" + this._colorIndex + "_" + this._chessIndex + "_png");
		this._chessBg.texture = texture;
	}

	public setPoint(point: egret.Point) {
		this._point = point;
		this.x = point.x * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
		this.y = point.y * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
	}

	public getChessX(): number {
		return this._point.x;
	}

	public getChessY(): number {
		return this._point.y;
	}

	public setChessIsSelected(value: boolean) {
		if (this._isSelected == value) {
			return;
		}
		this._isSelected = value;

		if (value) {
			if (!this._chessSelectedImg) {
				this._chessSelectedImg = new egret.Bitmap();
				let texture: egret.Texture = RES.getRes("r_box_png");
				this._chessSelectedImg.texture = texture;
				this._chessSelectedImg.width = this._chessSelectedImg.height = this.width;
				this._chessSelectedImg.x = this._chessSelectedImg.y = 0;
				this.addChild(this._chessSelectedImg);
			}
			this._chessSelectedImg.visible = true;
		}
		else{
			if(this._chessSelectedImg){
				this._chessSelectedImg.visible = false;
			}
		}
	}

	public getChessIsSelected(): boolean {
		return this._isSelected;
	}

	public getChessType():number{
		return this._chessIndex;
	}
}