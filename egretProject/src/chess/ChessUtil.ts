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

	public static getAllRoutePointByChess(chessType: number, pointX: number, pointY: number, tempArr: egret.Point[] = null): egret.Point[] {
		if (!tempArr) {
			tempArr = [];
		}

		switch (chessType) {
			case 1:
			    ChessUtil.getBingRoutePoint(pointX,pointY,tempArr);
				break;
			case 2:
			    ChessUtil.getShiRoutePoint(pointX,pointY,tempArr);
				break;
			case 3:
			    ChessUtil.getXiangRoutePoint(pointX,pointY,tempArr);
				break;
			case 4:
			    ChessUtil.getPaoRoutePoint(pointX,pointY,tempArr);
				break;
			case 5:
			    ChessUtil.getMaRoutePoint(pointX,pointY,tempArr);
				break;
			case 6:
			    ChessUtil.getJuRoutePoint(pointX,pointY,tempArr);
				break;
			case 7:
			    ChessUtil.getJiangRoutePoint(pointX,pointY,tempArr);
				break;
		}

		return tempArr;
	}

	public static getBingRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		if (pointY > 4) {
			point = ObjectPool.pop("egret.Point");
			point.x = pointX;
			point.y = pointY - 1;
			tempArr.push(point);
		}
		else if (pointY == 0) {
			for (i = -1; i < 2; i = i + 2) {
				point = ObjectPool.pop("egret.Point");
				point.y = pointY;
				point.x = pointX + i;
				if (point.x >= 0 && point.x <= 8) {
					tempArr.push(point);
				}
			}
		}
		else {
			for (i = -1; i < 2; i = i + 2) {
				point = ObjectPool.pop("egret.Point");
				point.y = pointY;
				point.x = pointX + i;
				if (point.x >= 0 && point.x <= 8) {
					tempArr.push(point);
				}
			}

			point = ObjectPool.pop("egret.Point");
			point.x = pointX;
			point.y = pointY - 1;
			tempArr.push(point);
		}
	}

	public static getShiRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 5;
		var maxY: number;
		var minX: number = 3;
		var minY: number;
		if (pointY > 5) {
			maxY = 9;
			minY = 7;
		}
		else {
			maxY = 2;
			minY = 0;
		}

		for (i = -1; i < 2; i = i + 2) {
			for (j = -1; j < 2; j = j + 2) {
				point = ObjectPool.pop("egret.Point");
				point.x = pointX + i;
				point.y = pointY + j;

				if (point.x <= maxX && point.y <= maxY && point.x >= minX && point.y >= minY) {
					tempArr.push(point);
				}
			}
		}
	}

	public static getXiangRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 8;
		var maxY: number;
		var minX: number = 0;
		var minY: number;
		if (pointY >= 5) {
			maxY = 9;
			minY = 5;
		}
		else {
			maxY = 4;
			minY = 0;
		}

		for (i = -2; i < 5; i = i + 4) {
			for (j = -2; j < 5; j = j + 4) {
				point = ObjectPool.pop("egret.Point");
				point.x = pointX + i;
				point.y = pointY + j;

				if (point.x <= maxX && point.y <= maxY && point.x >= minX && point.y >= minY) {
					tempArr.push(point);
				}
			}
		}
	}

	public static getPaoRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;
		for (i = 0; i <= 8; i++) {
			point = ObjectPool.pop("egret.Point");
			point.x = i;
			point.y = pointY;
			tempArr.push(point);
		}

		for (i = 0; i <= 9; i++) {
			point = ObjectPool.pop("egret.Point");
			point.x = pointX;
			point.y = i;
			tempArr.push(point);
		}
	}

	public static getMaRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;

		for (i = -2; i <= 2; i++) {
			for (j = -2; j <= 2; j++) {
				if (Math.abs(i) != Math.abs(j) && i && j) {
					point = ObjectPool.pop("egret.Point");
					point.x = pointX + i;
					point.y = pointY + j;

					if (point.x <= maxX && point.y <= maxY && point.x >= minX && point.y >= minY) {
						tempArr.push(point);
					}
				}
			}
		}
	}

	public static getJuRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 8;
		var maxY: number = 9;
		var minX: number = 0;
		var minY: number = 0;
		for (i = 0; i <= 8; i++) {
			point = ObjectPool.pop("egret.Point");
			point.x = i;
			point.y = pointY;
			tempArr.push(point);
		}

		for (i = 0; i <= 9; i++) {
			point = ObjectPool.pop("egret.Point");
			point.x = pointX;
			point.y = i;
			tempArr.push(point);
		}
	}

	public static getJiangRoutePoint(pointX: number, pointY: number, tempArr: egret.Point[]) {
		var point: egret.Point;
		var i: number;
		var j: number;
		var maxX: number = 8;
		var maxY: number;
		var minX: number = 0;
		var minY: number;

		if (pointY >= 5) {
			maxY = 9;
			minY = 7;
		}
		else {
			maxY = 2;
			minY = 0;
		}

		for (i = -1; i <= 1; i++) {
			for (j = -1; j <= 1; j++) {
				if (i == 0 && j == 0) {
					continue;
				}
				point = ObjectPool.pop("egret.Point");
				point.x = pointX + i;
				point.y = pointY + j;

				if (point.x <= maxX && point.y <= maxY && point.x >= minX && point.y >= minY) {
					tempArr.push(point);
				}
			}
		}
	}
}