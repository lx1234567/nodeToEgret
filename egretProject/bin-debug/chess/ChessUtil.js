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
    return ChessUtil;
}());
__reflect(ChessUtil.prototype, "ChessUtil");
//# sourceMappingURL=ChessUtil.js.map