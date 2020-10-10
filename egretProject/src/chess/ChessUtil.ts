class ChessUtil {
	public constructor() {
	}

	/** 根据棋盘点击的坐标获取棋盘的x轴与y轴 */
	public static getClickChessBoardXY(clickPoint: egret.Point, cellSize: number, tempPoint: egret.Point = null): egret.Point {
		if (!clickPoint || !cellSize) {
			return;
		}

		if (!tempPoint) {
			tempPoint = new egret.Point();
		}

		if (clickPoint.x < cellSize / 2 * -1
			|| clickPoint.x > cellSize * 8 + cellSize / 2
			|| clickPoint.y < cellSize / 2 * -1
			|| clickPoint.y > cellSize * 9 + cellSize / 2) {
			return;
		}

		var x: number = Math.floor((clickPoint.x + cellSize / 2) / cellSize);
		x = Math.min(8, x);
		x = Math.max(0, x);

		var y: number = Math.floor((clickPoint.y + cellSize / 2) / cellSize);
		y = Math.min(9, y);
		y = Math.max(0, y);

		tempPoint.x = x;
		tempPoint.y = y;
		return tempPoint;
	}

	/**
	 * 是否被将
	 * @param  {ChessData[]} chessDataArr1 被将方
	 * @param  {ChessData[]} chessDataArr2 将军方
	 */
	public static isCheck(chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		/** 将军方兵林线 */
		var bingLine: number;
		var jiangPosX: number;
		var jiangPosY: number;

		var chessData: ChessData;
		for (var i: number = 0; i < chessDataArr1.length; i++) {
			chessData = chessDataArr1[i];
			if (chessData.chessType == ChessGlobalData.JIANG) {
				jiangPosX = chessData.pos.x;
				jiangPosY = chessData.pos.y;
				break;
			}
		}
		bingLine = jiangPosY <= 2 ? 6 : 3;

		for (var j: number = 0; j < chessDataArr2.length; j++) {
			chessData = chessDataArr2[j];
			if (chessData.chessType == ChessGlobalData.BING) {
				var isCross: boolean = false;
				if (bingLine == 6) {
					if (chessData.pos.y < 5) {
						isCross = true;
					}
				}
				else {
					if (chessData.pos.y > 4) {
						isCross = true;
					}
				}
				if (ChessUtil.IsBingCanTakeChess(chessData.pos.x, chessData.pos.y, jiangPosX, jiangPosY, isCross)) {
					return true;
				}
			}
			else if (chessData.chessType == ChessGlobalData.JU) {
				if (ChessUtil.IsJuCanTakeChess(chessData.pos.x, chessData.pos.y, jiangPosX, jiangPosY, chessDataArr1, chessDataArr2)) {
					return true;
				}
			}
			else if (chessData.chessType == ChessGlobalData.MA) {
				if (ChessUtil.IsMaCanTakeChess(chessData.pos.x, chessData.pos.y, jiangPosX, jiangPosY, chessDataArr1, chessDataArr2)) {
					return true;
				}
			}
			else if (chessData.chessType == ChessGlobalData.PAO) {
				if (ChessUtil.IsPaoCanTakeChess(chessData.pos.x, chessData.pos.y, jiangPosX, jiangPosY, chessDataArr1, chessDataArr2)) {
					return true;
				}
			}
			else if (chessData.chessType == ChessGlobalData.JIANG) {
				if (chessData.pos.x == jiangPosX) {
					var minY: number = Math.min(jiangPosY, chessData.pos.y);
					var maxY: number = Math.max(jiangPosY, chessData.pos.y);
					var result: boolean = true;
					for (var k: number = minY + 1; k < maxY; k++) {
						if (ChessUtil.getChessByPos(jiangPosX, k, chessDataArr1) || ChessUtil.getChessByPos(jiangPosX, k, chessDataArr2)) {
							result = false;
							break;
						}
					}
					if (result) {
						return true;
					}
				}
			}
		}
		return false;
	}


	/** 是否被将死
	 * @param  {ChessData[]} chessDataArr1 应将方
	 * @param  {ChessData[]} chessDataArr2 将军方
	 * @returns boolean
	 */
	public static isCheckmate(chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		var i: number;
		var j: number;
		var k: number;
		var tempChessData: ChessData;
		var tempOtherChessData: ChessData;
		var tempPoint: egret.Point;
		var allCanMovePos: egret.Point[];
		chessDataArr1 = chessDataArr1.concat();
		chessDataArr2 = chessDataArr2.concat();

		var chessDataObj2: { [key: string]: ChessData };
		var tempPoint1: egret.Point = ObjectPool.pop("egret.Point");
		//是否将死
		chessDataObj2 = {};
		for (i = 0; i < chessDataArr2.length; i++) {
			tempChessData = chessDataArr2[i];
			chessDataObj2[tempChessData.pos.x + "_" + tempChessData.pos.y] = tempChessData;
		}
		for (i = 0; i < chessDataArr1.length; i++) {
			tempChessData = chessDataArr1[i];
			tempPoint1.x = tempChessData.pos.x;
			tempPoint1.y = tempChessData.pos.y;
			allCanMovePos = ChessUtil.getChessAllCanMovePos(tempChessData, chessDataArr1, chessDataArr2);
			for (j = 0; j < allCanMovePos.length; j++) {
				tempPoint = allCanMovePos[j];
				if (chessDataObj2[tempPoint.x + "_" + tempPoint.y]) {
					tempOtherChessData = chessDataObj2[tempPoint.x + "_" + tempPoint.y];
					chessDataArr2.splice(chessDataArr2.indexOf(tempOtherChessData), 1);
				}
				tempChessData.pos.x = tempPoint.x;
				tempChessData.pos.y = tempPoint.y;
				if (!ChessUtil.isCheck(chessDataArr1, chessDataArr2)) {
					tempChessData.pos.x = tempPoint1.x;
					tempChessData.pos.y = tempPoint1.y;
					if (tempOtherChessData) {
						chessDataArr2.push(tempOtherChessData);
						tempOtherChessData = null;
					}
					return false;
				}
				tempChessData.pos.x = tempPoint1.x;
				tempChessData.pos.y = tempPoint1.y;
				if (tempOtherChessData) {
					chessDataArr2.push(tempOtherChessData);
					tempOtherChessData = null;
				}
			}
		}
		return true;
	}

	/** 获取己方棋子所有可移动位置，包括吃子 */
	public static getChessAllCanMovePos(chessData: ChessData, chessDataArr1: ChessData[], chessDataArr2: ChessData[], tempArr: egret.Point[] = null): egret.Point[] {
		if (!tempArr) {
			tempArr = [];
		}
		switch (chessData.chessType) {
			case ChessGlobalData.BING:
				tempArr = ChessUtil.getBingAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.SHI:
				tempArr = ChessUtil.getShiAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.XIANG:
				tempArr = ChessUtil.getXiangAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.PAO:
				tempArr = ChessUtil.getPaoAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.MA:
				tempArr = ChessUtil.getMaAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.JU:
				tempArr = ChessUtil.getJuAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
			case ChessGlobalData.JIANG:
				tempArr = ChessUtil.getJiangAllMovePos(chessData.pos, chessDataArr1, chessDataArr2);
				break;
		}

		return tempArr;
	}

	public static getBingAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var i: number;
		var j: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isCross: boolean = false;
		if (pos.y < 5) {
			isCross = true;
		}

		if (!isCross) {
			tempPoint = ObjectPool.pop("egret.Point");
			tempPoint.x = pos.x;
			tempPoint.y = pos.y - 1;
			resultPoitArr.push(tempPoint);
			for (i = 0; i < chessDataArr1.length; i++) {
				chessData = chessDataArr1[i];
				if (chessData.chessType != ChessGlobalData.SHI || chessData.chessType != ChessGlobalData.JIANG) {
					if (chessData.pos.y == pos.y - 1 && chessData.pos.x == pos.x) {
						resultPoitArr.pop();
						break;
					}
				}
			}
		}
		else {
			for (i = -1; i < 2; i = i + 2) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x + i;
				tempPoint.y = pos.y;
				if (tempPoint.x >= 0 && tempPoint.x <= 8) {
					resultPoitArr.push(tempPoint);
					for (j = 0; j < chessDataArr1.length; j++) {
						chessData = chessDataArr1[j];
						if (chessData.chessType != ChessGlobalData.SHI || chessData.chessType != ChessGlobalData.JIANG || chessData.chessType != ChessGlobalData.XIANG) {
							if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
								resultPoitArr.pop();
								break;
							}
						}
					}
				}
			}

			if (pos.y != 0) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x;
				tempPoint.y = pos.y - 1;
				resultPoitArr.push(tempPoint);
				for (j = 0; j < chessDataArr1.length; j++) {
					chessData = chessDataArr1[j];
					if (chessData.chessType != ChessGlobalData.SHI || chessData.chessType != ChessGlobalData.JIANG || chessData.chessType != ChessGlobalData.XIANG) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							resultPoitArr.pop();
							break;
						}
					}
				}
			}
		}
		return resultPoitArr;
	}

	public static getShiAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var i: number;
		var j: number;
		var k: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;

		var maxX: number = 5;
		var maxY: number = 9;
		var minX: number = 3;
		var minY: number = 7;

		for (i = -1; i < 2; i = i + 2) {
			for (j = -1; j < 2; j = j + 2) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x + i;
				tempPoint.y = pos.y + j;
				if (tempPoint.x <= maxX && tempPoint.y <= maxY && tempPoint.x >= minX && tempPoint.y >= minY) {
					resultPoitArr.push(tempPoint);
					for (k = 0; k < chessDataArr1.length; k++) {
						chessData = chessDataArr1[k];
						if (chessData.chessType != ChessGlobalData.BING) {
							if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
								resultPoitArr.pop();
								break;
							}
						}
					}
				}
			}
		}
		return resultPoitArr;
	}

	public static getXiangAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var i: number;
		var j: number;
		var k: number;

		var disX: number;
		var disY: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isBreak: boolean;

		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 5;

		for (i = -2; i < 5; i = i + 4) {
			for (j = -2; j < 5; j = j + 4) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x + i;
				tempPoint.y = pos.y + j;

				if (tempPoint.x <= maxX && tempPoint.y <= maxY && tempPoint.x >= minX && tempPoint.y >= minY) {
					resultPoitArr.push(tempPoint);
					isBreak = false;
					disX = i < 0 ? -1 : 1;
					disY = j < 0 ? -1 : 1;
					for (k = 0; k < chessDataArr1.length; k++) {
						chessData = chessDataArr1[k];
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							resultPoitArr.pop();
							isBreak = true;
							break;
						}

						if (chessData.pos.x == disX + pos.x && chessData.pos.y == disY + pos.y) {
							resultPoitArr.pop();
							isBreak = true;
							break;
						}
					}

					if (!isBreak) {
						for (k = 0; k < chessDataArr2.length; k++) {
							chessData = chessDataArr2[k];
							if (chessData.pos.x == disX + pos.x && chessData.pos.y == disY + pos.y) {
								resultPoitArr.pop();
								break;
							}
						}
					}
				}
			}
		}
		return resultPoitArr;
	}

	public static getMaAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var i: number;
		var j: number;
		var k: number;

		var disX: number;
		var disY: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isBreak: boolean;

		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;

		for (i = -2; i <= 2; i++) {
			for (j = -2; j <= 2; j++) {
				if (Math.abs(i) != Math.abs(j) && i && j) {
					tempPoint = ObjectPool.pop("egret.Point");
					tempPoint.x = pos.x + i;
					tempPoint.y = pos.y + j;

					if (tempPoint.x <= maxX && tempPoint.y <= maxY && tempPoint.x >= minX && tempPoint.y >= minY) {
						resultPoitArr.push(tempPoint);
						isBreak = false;
						if (Math.abs(i) == 2) {
							disX = i < 0 ? -1 : 1;
							disY = 0
						}
						else {
							disX = 0;
							disY = j < 0 ? -1 : 1;
						}


						for (k = 0; k < chessDataArr1.length; k++) {
							chessData = chessDataArr1[k];
							if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
								resultPoitArr.pop();
								isBreak = true;
								break;
							}

							if (chessData.pos.x == disX + pos.x && chessData.pos.y == disY + pos.y) {
								resultPoitArr.pop();
								isBreak = true;
								break;
							}
						}

						if (!isBreak) {
							for (k = 0; k < chessDataArr2.length; k++) {
								chessData = chessDataArr2[k];
								if (chessData.pos.x == disX + pos.x && chessData.pos.y == disY + pos.y) {
									resultPoitArr.pop();
									break;
								}
							}
						}
					}
				}
			}
		}
		return resultPoitArr;
	}

	public static getJiangAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var i: number;
		var j: number;
		var k: number;

		var disX: number;
		var disY: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isBreak: boolean;

		var maxX: number = 5;
		var maxY: number = 9;
		var minX: number = 3;
		var minY: number = 7;

		for (i = -1; i <= 1; i++) {
			for (j = -1; j <= 1; j++) {
				if (i == 0 && j == 0) {
					continue;
				}

				if (j != 0 && i != 0) {
					continue;
				}

				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x + i;
				tempPoint.y = pos.y + j;

				if (tempPoint.x <= maxX && tempPoint.y <= maxY && tempPoint.x >= minX && tempPoint.y >= minY) {
					resultPoitArr.push(tempPoint);
					for (k = 0; k < chessDataArr1.length; k++) {
						chessData = chessDataArr1[k];
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							resultPoitArr.pop();
							break;
						}
					}
				}
			}
		}
		return resultPoitArr;
	}

	public static getJuAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var allChessDataArr: ChessData[] = chessDataArr1.concat(chessDataArr2.concat());
		var i: number;
		var j: number;
		var k: number;

		var disX: number;
		var disY: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isBreak: boolean;

		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;

		i = pos.x + 1;
		if (i <= maxX && i >= minX) {
			for (i; i <= 8; i++) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = i;
				tempPoint.y = pos.y;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
						if (chessData.colorType == chessDataArr1[0].colorType) {
							resultPoitArr.pop();
						}
						isBreak = true;
						break;
					}
				}

				if (isBreak) {
					break;
				}
			}
		}
		i = pos.x - 1;
		if (i <= maxX && i >= minX) {
			for (i; i >= 0; i--) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = i;
				tempPoint.y = pos.y;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
						if (chessData.colorType == chessDataArr1[0].colorType) {
							resultPoitArr.pop();
						}
						isBreak = true;
						break;
					}
				}

				if (isBreak) {
					break;
				}
			}
		}
		i = pos.y + 1;
		if (i <= maxY && i >= minY) {
			for (i; i <= 9; i++) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x;
				tempPoint.y = i;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
						if (chessData.colorType == chessDataArr1[0].colorType) {
							resultPoitArr.pop();
						}
						isBreak = true;
						break;
					}
				}

				if (isBreak) {
					break;
				}
			}
		}

		i = pos.y - 1;
		if (i <= maxY && i >= minY) {
			for (i; i >= 0; i--) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x;
				tempPoint.y = i;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
						if (chessData.colorType == chessDataArr1[0].colorType) {
							resultPoitArr.pop();
						}
						isBreak = true;
						break;
					}
				}

				if (isBreak) {
					break;
				}
			}
		}
		return resultPoitArr;
	}

	public static getPaoAllMovePos(pos: egret.Point, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): egret.Point[] {
		var resultPoitArr: egret.Point[] = [];
		var allChessDataArr: ChessData[] = chessDataArr1.concat(chessDataArr2.concat());
		var i: number;
		var j: number;
		var k: number;

		var disX: number;
		var disY: number;
		var chessData: ChessData;
		var tempPoint: egret.Point;
		var isBreak: boolean;
		var isFindBogie: boolean;

		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;

		i = pos.x + 1;
		isFindBogie = false;
		if (i <= maxX && i >= minX) {
			for (i; i <= 8; i++) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = i;
				tempPoint.y = pos.y;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (!isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							isFindBogie = true;
							resultPoitArr.pop();
							break;
						}
					}

					if (isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							if (chessData.colorType == chessDataArr1[0].colorType) {
								resultPoitArr.pop();
							}
							isBreak = true;
							break;
						}
						if (j == allChessDataArr.length - 1) {
							resultPoitArr.pop();
							break;
						}
					}

				}

				if (isBreak) {
					break;
				}
			}
		}

		i = pos.x - 1;
		isFindBogie = false;
		if (i <= maxX && i >= minX) {
			for (i; i >= 0; i--) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = i;
				tempPoint.y = pos.y;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (!isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							isFindBogie = true;
							resultPoitArr.pop();
							break;
						}
					}

					if (isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							if (chessData.colorType == chessDataArr1[0].colorType) {
								resultPoitArr.pop();
							}
							isBreak = true;
							break;
						}
						if (j == allChessDataArr.length - 1) {
							resultPoitArr.pop();
							break;
						}
					}
				}

				if (isBreak) {
					break;
				}
			}
		}
		i = pos.y + 1;
		isFindBogie = false;
		if (i <= maxY && i >= minY) {
			for (i; i <= 9; i++) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x;
				tempPoint.y = i;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (!isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							isFindBogie = true;
							resultPoitArr.pop();
							break;
						}
					}

					if (isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							if (chessData.colorType == chessDataArr1[0].colorType) {
								resultPoitArr.pop();
							}
							isBreak = true;
							break;
						}
						if (j == allChessDataArr.length - 1) {
							resultPoitArr.pop();
							break;
						}
					}
				}

				if (isBreak) {
					break;
				}
			}
		}

		i = pos.y - 1;
		isFindBogie = false;
		if (i <= maxY && i >= minY) {
			for (i; i >= 0; i--) {
				tempPoint = ObjectPool.pop("egret.Point");
				tempPoint.x = pos.x;
				tempPoint.y = i;
				resultPoitArr.push(tempPoint);
				isBreak = false;
				for (j = 0; j < allChessDataArr.length; j++) {
					chessData = allChessDataArr[j];
					if (!isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							isFindBogie = true;
							resultPoitArr.pop();
							break;
						}
					}

					if (isFindBogie) {
						if (chessData.pos.x == tempPoint.x && chessData.pos.y == tempPoint.y) {
							if (chessData.colorType == chessDataArr1[0].colorType) {
								resultPoitArr.pop();
							}
							isBreak = true;
							break;
						}
						if (j == allChessDataArr.length - 1) {
							resultPoitArr.pop();
							break;
						}
					}
				}

				if (isBreak) {
					break;
				}
			}
		}
		return resultPoitArr;
	}




	public static IsBingCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number, isCross: boolean = true): boolean {
		if (isCross) {
			if ((Math.abs(otherChessX - chessX) == 1 && otherChessY == chessY) || ((chessY - otherChessY) == 1 && otherChessX == chessX)) {
				return true;
			}
		}
		else {
			if (chessY - otherChessY == 1) {
				return true;
			}
		}
		return false;
	}

	private static IsShiCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number): boolean {
		if (otherChessX >= 3 && otherChessX <= 5 && Math.abs(otherChessX - chessX) == 1 && Math.abs(otherChessY - chessY) == 1) {
			return true;
		}
		return false;
	}

	private static IsXiangCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		if (Math.abs(otherChessX - chessX) == 2 && Math.abs(otherChessY - chessY) == 2) {
			var disX: number = otherChessX - chessX;
			var disY: number = otherChessY - chessY;
			disX = disX > 0 ? 1 : -1;
			disY = disY > 0 ? 1 : -1;
			if (!ChessUtil.getChessByPos(chessX + disX, chessY + disY, chessDataArr1) && !ChessUtil.getChessByPos(chessX + disX, chessY + disY, chessDataArr2)) {
				return true;
			}
		}
		return false;
	}

	private static IsPaoCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		if ((Math.abs(otherChessX - chessX) && !Math.abs(otherChessY - chessY)) || (!Math.abs(otherChessX - chessX) && Math.abs(otherChessY - chessY))) {
			var i: number;
			var startIndex: number;
			var endIndex: number;
			var count: number = 0;
			if (Math.abs(otherChessY - chessY)) {
				startIndex = Math.min(otherChessY, chessY);
				endIndex = Math.max(otherChessY, chessY);
				for (i = startIndex + 1; i < endIndex; i++) {
					if (ChessUtil.getChessByPos(chessX, i, chessDataArr1) || ChessUtil.getChessByPos(chessX, i, chessDataArr2)) {
						count++;
					}
				}
				if (count == 1) {
					return true;
				}
			}
			else if (Math.abs(otherChessX - chessX)) {
				startIndex = Math.min(otherChessX, chessX);
				endIndex = Math.max(otherChessX, chessX);
				for (i = startIndex + 1; i < endIndex; i++) {
					if (ChessUtil.getChessByPos(i, chessY, chessDataArr1) || ChessUtil.getChessByPos(i, chessY, chessDataArr2)) {
						count++;
					}
				}
				if (count == 1) {
					return true;
				}
			}
		}
		return false;
	}

	private static IsJuCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		if ((Math.abs(otherChessX - chessX) && !Math.abs(otherChessY - chessY)) || (!Math.abs(otherChessX - chessX) && Math.abs(otherChessY - chessY))) {
			var i: number;
			var startIndex: number;
			var endIndex: number;
			var count: number = 0;
			if (Math.abs(otherChessY - chessY)) {
				startIndex = Math.min(otherChessY, chessY);
				endIndex = Math.max(otherChessY, chessY);
				if (Math.abs(startIndex - endIndex) == 1) {
					return true;
				}

				for (i = startIndex + 1; i < endIndex; i++) {
					if (ChessUtil.getChessByPos(chessX, i, chessDataArr1) || ChessUtil.getChessByPos(chessX, i, chessDataArr2)) {
						count++;
					}
				}
				if (count == 0) {
					return true;
				}
			}
			else if (Math.abs(otherChessX - chessX)) {
				startIndex = Math.min(otherChessX, chessX);
				endIndex = Math.max(otherChessX, chessX);

				if (Math.abs(startIndex - endIndex) == 1) {
					return true;
				}
				for (i = startIndex + 1; i < endIndex; i++) {
					if (ChessUtil.getChessByPos(i, chessY, chessDataArr1) || ChessUtil.getChessByPos(i, chessY, chessDataArr2)) {
						count++;
					}
				}
				if (count == 0) {
					return true;
				}
			}
		}
		return false;
	}

	private static IsMaCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number, chessDataArr1: ChessData[], chessDataArr2: ChessData[]): boolean {
		if ((Math.abs(otherChessX - chessX) == 1 && Math.abs(otherChessY - chessY) == 2) || (Math.abs(otherChessX - chessX) == 2 && Math.abs(otherChessY - chessY) == 1)) {
			var disX: number = otherChessX - chessX;
			var disY: number = otherChessY - chessY;
			if (Math.abs(disX) == 2) {
				disY = 0
				disX = disX > 0 ? 1 : -1;
			}
			else if (Math.abs(disY) == 2) {
				disX = 0;
				disY = disY > 0 ? 1 : -1;
			}

			if (!ChessUtil.getChessByPos(chessX + disX, chessY + disY, chessDataArr1) && !ChessUtil.getChessByPos(chessX + disX, chessY + disY, chessDataArr2)) {
				return true;
			}
		}
		return false;
	}

	private static IsJiangCanTakeChess(chessX: number, chessY: number, otherChessX: number, otherChessY: number): boolean {
		if (otherChessX >= 3 && otherChessX <= 5 && otherChessY >= 7 && otherChessY <= 9) {
			if ((Math.abs(otherChessX - chessX) == 1 && otherChessY == chessY) || (Math.abs(chessY - otherChessY) == 1 && otherChessX == chessX)) {
				return true;
			}
		}
		return false;
	}

	public static getChessByPos(chessX: number, chessY: number, chessDataArr: ChessData[]): ChessData {
		var chessData: ChessData;
		for (var i: number = 0; i < chessDataArr.length; i++) {
			chessData = chessDataArr[i];
			if (chessData.pos.x == chessX && chessData.pos.y == chessY) {
				return chessData;
			}
		}
		return null;
	}

}