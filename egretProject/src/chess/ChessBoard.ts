class ChessBoard extends egret.Sprite {
	public constructor() {
		super();
	}

	private _chessCellSize: number = ChessGlobalData.cellSize;
	private _startX: number = 10;
	private _startY: number = 100;

	private _text1: egret.TextField;
	private _text2: egret.TextField;
	private _bgImg: egret.Bitmap;

	private _playerSelfChessDataArr: ChessData[];
	private _playerOtherChessDataArr: ChessData[];

	private _playerSelfChess: Chess[];
	private _playerOtherChess: Chess[];

	private _playerSelfChessObj: {};
	private _playerOtherChessObj: {};

	private _routeImgArr: egret.Bitmap[] = [];
	private _routeImgPool: egret.Bitmap[] = [];

	private _tempPoint: egret.Point;
	private _selectedChess: Chess;
	private _selectedChessRoutePointArr: egret.Point[] = [];

	private _isCanMoveChess: boolean;

	private _originalPos: msg.SChessPos = new msg.SChessPos();
	private _movePos: msg.SChessPos = new msg.SChessPos();

	public init() {
		this.initBoard();
		this.initChess();
	}

	/** 初始化棋盘 */
	private initBoard() {
		this.width = this._chessCellSize * 8;
		this.height = this._chessCellSize * 9;

		var bgTexture: egret.Texture = RES.getRes("bg_png");
		this._bgImg = new egret.Bitmap();
		this._bgImg.texture = bgTexture;

		this.addChild(this._bgImg);
		this._bgImg.x = -38;
		this._bgImg.y = -43;

		this._bgImg.width = this.width + 93;
		this._bgImg.height = this.height + 80;

		this.x = this._startX;
		this.y = this._startY;
	}

	//初始化棋子
	public initChess() {
		this._playerOtherChessDataArr = [];
		this._playerSelfChessDataArr = [];

		this._playerSelfChess = [];
		this._playerOtherChess = [];

		this._playerOtherChessObj = {};
		this._playerSelfChessObj = {};
		var i, j, k, chessPoint: egret.Point, chessData: ChessData, chess: Chess;

		var selfInfo: msg.SChessInitInfo = GameCache.chessCache.selfInitInfo;
		var otherInfo: msg.SChessInitInfo = GameCache.chessCache.elseInitInfo;

		for (i = 0; i < 7; i++) {
			var colorIndex: number = selfInfo.colorIndex;
			var point: number[][] = ChessGlobalData.chessStartPoint1[i];
			for (j = 0; j < point.length; j++) {
				chessData = new ChessData();
				chessData.colorType = colorIndex;
				chessData.chessType = i + 1;
				chessPoint = new egret.Point(point[j][0], point[j][1]);
				chessData.pos = chessPoint;
				this._playerSelfChessDataArr.push(chessData);
			}
		}

		for (i = 0; i < 7; i++) {
			var colorIndex: number = otherInfo.colorIndex;
			var point: number[][] = ChessGlobalData.chessStartPoint2[i];
			for (j = 0; j < point.length; j++) {
				chessData = new ChessData();
				chessData.colorType = colorIndex;
				chessData.chessType = i + 1;
				chessPoint = new egret.Point(point[j][0], point[j][1]);
				chessData.pos = chessPoint;
				this._playerOtherChessDataArr.push(chessData);
			}
		}

		for (i = 0; i < this._playerSelfChessDataArr.length; i++) {
			chessData = this._playerSelfChessDataArr[i];
			chess = new Chess();
			chess.initChess(chessData);
			this._playerSelfChess.push(chess);
			this._playerSelfChessObj[chessData.pos.x + "_" + chessData.pos.y] = chess;
		}

		for (k = 0; k < this._playerSelfChess.length; k++) {
			this.addChild(this._playerSelfChess[k]);
		}

		for (i = 0; i < this._playerOtherChessDataArr.length; i++) {
			chessData = this._playerOtherChessDataArr[i];
			chess = new Chess();
			chess.initChess(chessData);
			this._playerOtherChess.push(chess);
			this._playerOtherChessObj[chessData.pos.x + "_" + chessData.pos.y] = chess;
		}

		for (k = 0; k < this._playerOtherChess.length; k++) {
			this.addChild(this._playerOtherChess[k]);
		}

		if (selfInfo.colorIndex == 1) {
			this._isCanMoveChess = true;
		}
	}

	public onFirstClickChessBoard(e: egret.TouchEvent): boolean {
		if (!this._isCanMoveChess) {
			return false;
		}

		var x: number = e.stageX;
		var y: number = e.stageY;

		if (!this._tempPoint) {
			this._tempPoint = new egret.Point();
		}

		this._tempPoint = this.globalToLocal(x, y, this._tempPoint);
		this._tempPoint = ChessUtil.getClickChessBoardXY(this._tempPoint, this._chessCellSize, this._tempPoint);

		if (!this._tempPoint) {
			console.log("not click chessboard");
			return false;
		}

		if (!this._playerSelfChessObj[this._tempPoint.x + "_" + this._tempPoint.y]) {
			return false;
		}

		if (this._selectedChess) {
			this._selectedChess.setChessIsSelected(false);
		}

		this._selectedChess = this._playerSelfChessObj[this._tempPoint.x + "_" + this._tempPoint.y];
		this._selectedChess.setChessIsSelected(true);

		this.updateSelectedChess();

		return true;
	}

	public onSecondClickChessBoard(e: egret.TouchEvent) {
		if (!this._isCanMoveChess) {
			return true;
		}

		var x: number = e.stageX;
		var y: number = e.stageY;

		if (!this._tempPoint) {
			this._tempPoint = new egret.Point();
		}

		this._tempPoint = this.globalToLocal(x, y, this._tempPoint);
		this._tempPoint = ChessUtil.getClickChessBoardXY(this._tempPoint, this._chessCellSize, this._tempPoint);

		if (!this._tempPoint) {
			return true;
		}

		var chess: Chess = this._playerSelfChessObj[this._tempPoint.x + "_" + this._tempPoint.y];
		if (chess) {
			if (this._selectedChess) {
				this._selectedChess.setChessIsSelected(false);
			}
			this._selectedChess = chess;
			this._selectedChess.setChessIsSelected(true);
			this.updateSelectedChess();
			return true;
		}

		//点击别人判吃
		chess = this._playerOtherChessObj[this._tempPoint.x + "_" + this._tempPoint.y];
		if (chess) {
			if (this.routeArrIsContainer(this._tempPoint)) {
				this._originalPos.x = this._selectedChess.getChessX();
				this._originalPos.y = this._selectedChess.getChessY();

				this._movePos.x = this._tempPoint.x;
				this._movePos.y = this._tempPoint.y;
				if (this.isCanMove(this._originalPos.x, this._originalPos.y, this._movePos.x, this._movePos.y)) {
					GameProxy.chessProxy.onMoveChess(this._originalPos, this._movePos);
					return false;
				}
				else {
					return true;
				}
			}
			return true;
		}

		if (this.routeArrIsContainer(this._tempPoint)) {
			this._originalPos.x = this._selectedChess.getChessX();
			this._originalPos.y = this._selectedChess.getChessY();

			this._movePos.x = this._tempPoint.x;
			this._movePos.y = this._tempPoint.y;
			if (this.isCanMove(this._originalPos.x, this._originalPos.y, this._movePos.x, this._movePos.y)) {
				GameProxy.chessProxy.onMoveChess(this._originalPos, this._movePos);
				return false;
			}
		}
		return true;
	}

	public onMoveChessSuc(e: egret.Event) {
		var obj: msg.SChessMoveInfo = e.data;
		var i: number;
		var j: number;
		var posX: number;
		var posY: number;
		var endX: number;
		var endY: number;
		var chessArr: Chess[];
		var chess: Chess;
		var chessData: ChessData;
		var chessData1: ChessData;
		var newPoint: egret.Point;
		var moveChess: Chess;

		this.clearCurSelectedChess();

		if (obj.playerId == GameCache.chessCache.selfInfo.playerId) {
			posX = obj.chessPos.x;
			posY = obj.chessPos.y;
			endX = obj.movePos.x;
			endY = obj.movePos.y;
			this._isCanMoveChess = false;
		}
		else {
			posX = 8 - obj.chessPos.x;
			posY = 9 - obj.chessPos.y;
			endX = 8 - obj.movePos.x;
			endY = 9 - obj.movePos.y;
			this._isCanMoveChess = true;
		}

		if (obj.playerId == GameCache.chessCache.selfInfo.playerId) {
			for (i = 0; i < this._playerSelfChessDataArr.length; i++) {
				chessData = this._playerSelfChessDataArr[i];
				if (chessData.pos.x == posX && chessData.pos.y == posY) {
					if (this._playerSelfChessObj[posX + "_" + posY]) {
						chess = this._playerSelfChessObj[posX + "_" + posY];
						delete this._playerSelfChessObj[posX + "_" + posY];
					}

					if (this._playerOtherChessObj[endX + "_" + endY]) {
						moveChess = this._playerOtherChessObj[endX + "_" + endY];
						var index: number = this._playerOtherChess.indexOf(moveChess);
						if (index != -1) {
							this._playerOtherChess.splice(index, 1);
						}
						delete this._playerOtherChessObj[endX + "_" + endY];
						this.removeChild(moveChess);

						for (j = 0; j < this._playerOtherChessDataArr.length; j++) {
							chessData1 = this._playerOtherChessDataArr[j];
							if (chessData1.pos.x == endX && chessData1.pos.y == endY) {
								this._playerOtherChessDataArr.splice(j, 1);
								break;
							}
						}
					}

					newPoint = ObjectPool.pop("egret.Point");
					newPoint.x = endX;
					newPoint.y = endY;
					chessData.pos = newPoint;
					chess.updateChessData(chessData);

					this._playerSelfChessObj[endX + "_" + endY] = chess;
					break;
				}
			}
		}
		else {
			for (i = 0; i < this._playerOtherChess.length; i++) {
				chessData = this._playerOtherChessDataArr[i];
				if (chessData.pos.x == posX && chessData.pos.y == posY) {
					if (this._playerOtherChessObj[posX + "_" + posY]) {
						chess = this._playerOtherChessObj[posX + "_" + posY];
						delete this._playerOtherChessObj[posX + "_" + posY];
					}

					if (this._playerSelfChessObj[endX + "_" + endY]) {
						moveChess = this._playerSelfChessObj[endX + "_" + endY];
						var index: number = this._playerSelfChess.indexOf(moveChess);
						if (index != -1) {
							this._playerSelfChess.splice(index, 1);
						}
						delete this._playerSelfChessObj[endX + "_" + endY];
						this.removeChild(moveChess);

						for (j = 0; j < this._playerSelfChessDataArr.length; j++) {
							chessData1 = this._playerSelfChessDataArr[j];
							if (chessData1.pos.x == endX && chessData1.pos.y == endY) {
								this._playerSelfChessDataArr.splice(j, 1);
								break;
							}
						}
					}

					newPoint = ObjectPool.pop("egret.Point");
					newPoint.x = endX;
					newPoint.y = endY;
					chessData.pos = newPoint;
					chess.updateChessData(chessData);

					this._playerOtherChessObj[endX + "_" + endY] = chess;
					break;
				}
			}

			if (ChessUtil.isCheckmate(this._playerSelfChessDataArr, this._playerOtherChessDataArr)) {
				this._isCanMoveChess = false;
				alert("您已输棋");
				console.log("您已输棋");
				return;
			}
		}
	}

	private updateSelectedChess() {
		this.clearAllRouteImg();

		var chessType: number = this._selectedChess.getChessType();
		var pointX: number = this._selectedChess.getChessX();
		var pointY: number = this._selectedChess.getChessY();

		this._selectedChessRoutePointArr = ChessUtil.getChessAllCanMovePos(this._selectedChess.getChessData(), this._playerSelfChessDataArr, this._playerOtherChessDataArr);

		for (var i: number = 0; i < this._selectedChessRoutePointArr.length; i++) {
			var point: egret.Point = this._selectedChessRoutePointArr[i];
			if (!this._playerOtherChessObj[point.x + "_" + point.y]) {
				var routeImage: egret.Bitmap = this._routeImgPool.pop();
				if (!routeImage) {
					routeImage = new egret.Bitmap();
					var textTure: egret.Texture = RES.getRes("dot_png");
					routeImage.texture = textTure;
				}
				routeImage.x = point.x * ChessGlobalData.cellSize - 18;
				routeImage.y = point.y * ChessGlobalData.cellSize - 23;
				this.addChild(routeImage);
				this._routeImgArr.push(routeImage);
			}
		}
	}

	private clearCurSelectedChess() {
		if (this._selectedChess) {
			this._selectedChess.setChessIsSelected(false);
			this._selectedChess = null;
			this.clearAllRouteImg();
		}
	}

	private clearAllRouteImg() {
		while (this._routeImgArr.length) {
			var routeImg: egret.Bitmap = this._routeImgArr.shift();
			if (routeImg.parent) {
				routeImg.parent.removeChild(routeImg);
				routeImg.x = routeImg.y = 0;
			}
			this._routeImgPool.push(routeImg);
		}

		while (this._selectedChessRoutePointArr.length) {
			var point: egret.Point = this._selectedChessRoutePointArr.shift();
			point.x = point.y = 0;
			ObjectPool.push(point);
		}
	}

	private routeArrIsContainer(point: egret.Point) {
		if (this._selectedChessRoutePointArr && this._selectedChessRoutePointArr.length) {
			for (var i: number = 0; i < this._selectedChessRoutePointArr.length; i++) {
				var routePoint: egret.Point = this._selectedChessRoutePointArr[i];
				if (routePoint.x == point.x && routePoint.y == point.y) {
					return true;
				}
			}
		}
		return false;
	}

	/** 判移(被将情况无法移动) */
	private isCanMove(startX: number, startY: number, endX: number, endY: number) {
		var chessData1: ChessData;
		var chessData2: ChessData;
		var chess1: Chess;
		var chess2: Chess;
		var tempChessData: ChessData;
		var i: number;
		var selfJiangData: ChessData;

		for (i = 0; i < this._playerSelfChessDataArr.length; i++) {
			tempChessData = this._playerSelfChessDataArr[i];
			if (tempChessData.pos.x == startX && tempChessData.pos.y == startY) {
				tempChessData.pos.x = endX;
				tempChessData.pos.y = endY;
				chessData1 = tempChessData;
				break;
			}
		}

		for (i = 0; i < this._playerOtherChessDataArr.length; i++) {
			tempChessData = this._playerOtherChessDataArr[i];
			if (tempChessData.pos.x == endX && tempChessData.pos.y == endY) {
				chessData2 = this._playerOtherChessDataArr.splice(i, 1)[0];
				break;
			}
		}

		var result: boolean = !ChessUtil.isCheck(this._playerSelfChessDataArr, this._playerOtherChessDataArr);

		//还原棋盘
		chessData1.pos.x = startX;
		chessData1.pos.y = startY;

		if (chessData2) {
			this._playerOtherChessDataArr.push(chessData2);
		}

		return result;
	}
}