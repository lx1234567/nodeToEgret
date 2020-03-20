class Chess extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	private _chessBg: egret.Bitmap;
	private _chessSelectedImg: egret.Bitmap;

	private _chessData:ChessData;

	private _isSelected: boolean;

	public initChess(chessData:ChessData) {
		this._chessBg = new egret.Bitmap();
		this.addChild(this._chessBg);
		this.width = this.height = ChessGlobalData.cellSize;
		this._chessBg.width = this._chessBg.height = this.width;
		
		this._chessData = chessData;
		this.updateChessData(chessData);

		let texture: egret.Texture = RES.getRes("chess_" + chessData.colorType + "_" + chessData.chessType + "_png");
		this._chessBg.texture = texture;
	}

	public updateChessData(chessData: ChessData) {
		this._chessData = chessData;
		this.x = chessData.pos.x * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
		this.y = chessData.pos.y * ChessGlobalData.cellSize - ChessGlobalData.cellSize / 2 + 6;
	}

	public getChessX(): number {
		return this._chessData.pos.x;
	}

	public getChessY(): number {
		return this._chessData.pos.y
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
		return this._chessData.chessType;
	}

	public getChessData():ChessData{
		return this._chessData;
	}
}