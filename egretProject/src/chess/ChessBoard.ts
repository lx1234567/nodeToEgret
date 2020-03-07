class ChessBoard extends egret.Sprite{
	public constructor() {
		super();
	}

	private _chessCellSize:number = 64;

	public init(){
		this.initBoard();
	}

    /** 初始化棋盘 */
	private initBoard(){
		this.width = this._chessCellSize * 8;
		this.height = this._chessCellSize * 9;

		this.graphics.beginFill(0x000000);
		this.graphics.drawRect(0,0,this.width,this.height);
	}
}