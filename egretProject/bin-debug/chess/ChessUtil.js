var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessUtil = (function () {
    function ChessUtil() {
    }
    /** 根据棋盘点击的坐标获取棋盘的x轴与y轴 */
    ChessUtil.getClickChessBoardXY = function (clickPoint, cellSize, tempPoint) {
        if (tempPoint === void 0) { tempPoint = null; }
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
        var x = Math.floor((clickPoint.x + cellSize / 2) / cellSize);
        x = Math.min(8, x);
        x = Math.max(0, x);
        var y = Math.floor((clickPoint.y + cellSize / 2) / cellSize);
        y = Math.min(9, y);
        y = Math.max(0, y);
        tempPoint.x = x;
        tempPoint.y = y;
        return tempPoint;
    };
    ChessUtil.getAllRoutePointByChess = function (chessType, pointX, pointY, tempArr) {
        if (tempArr === void 0) { tempArr = null; }
        if (!tempArr) {
            tempArr = [];
        }
        switch (chessType) {
            case ChessGlobalData.BING:
                ChessUtil.getBingRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.SHI:
                ChessUtil.getShiRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.XIANG:
                ChessUtil.getXiangRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.PAO:
                ChessUtil.getPaoRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.MA:
                ChessUtil.getMaRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.JU:
                ChessUtil.getJuRoutePoint(pointX, pointY, tempArr);
                break;
            case ChessGlobalData.JIANG:
                ChessUtil.getJiangRoutePoint(pointX, pointY, tempArr);
                break;
        }
        return tempArr;
    };
    ChessUtil.getBingRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
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
    };
    ChessUtil.getShiRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 5;
        var maxY;
        var minX = 3;
        var minY;
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
    };
    ChessUtil.getXiangRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 8;
        var maxY;
        var minX = 0;
        var minY;
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
    };
    ChessUtil.getPaoRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 8;
        var maxY = 9;
        var minX = 0;
        var minY = 0;
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
    };
    ChessUtil.getMaRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 8;
        var maxY = 9;
        var minX = 0;
        var minY = 0;
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
    };
    ChessUtil.getJuRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 8;
        var maxY = 9;
        var minX = 0;
        var minY = 0;
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
    };
    ChessUtil.getJiangRoutePoint = function (pointX, pointY, tempArr) {
        var point;
        var i;
        var j;
        var maxX = 8;
        var maxY;
        var minX = 0;
        var minY;
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
                if (j != 0 && i != 0) {
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
    };
    return ChessUtil;
}());
__reflect(ChessUtil.prototype, "ChessUtil");
//# sourceMappingURL=ChessUtil.js.map