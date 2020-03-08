class ChessUtil {
	public constructor() {
	}

    /** 根据棋盘点击的坐标获取棋盘的x轴与y轴 */
	public static getClickChessBoardXY(clickPoint:egret.Point,cellSize:number,tempPoint:egret.Point = null):egret.Point{
		if(!clickPoint || !cellSize){
			return;
		}

		if(!tempPoint){
			tempPoint = new egret.Point();
		}

		if(clickPoint.x < cellSize / 2 * -1 
		|| clickPoint.x > cellSize * 8 + cellSize / 2 
		|| clickPoint.y < cellSize / 2 * -1 
		|| clickPoint.y > cellSize * 9 + cellSize / 2){
			return;
		}

		var x:number = Math.floor((clickPoint.x + cellSize / 2) / cellSize);
		x = Math.min(8,x);
		x = Math.max(0,x);

		var y:number = Math.floor((clickPoint.y + cellSize / 2) / cellSize);
		y = Math.min(9,y);
		y = Math.max(0,y);

		tempPoint.x = x;
		tempPoint.y = y;
		return tempPoint;
	}
}