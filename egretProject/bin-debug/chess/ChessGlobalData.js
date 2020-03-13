var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessGlobalData = (function () {
    function ChessGlobalData() {
        this.chessIndexName1 = { 1: "兵", 2: "仕", 3: "相", 4: "炮", 5: "马", 6: "車", 7: "帅" };
        this.chessIndexName2 = { 1: "卒", 2: "士", 3: "象", 4: "炮", 5: "马", 6: "車", 7: "将" };
    }
    ChessGlobalData.cellSize = 75;
    /** 1玩家初始位置 */
    ChessGlobalData.chessStartPoint1 = [[[0, 6], [2, 6], [4, 6], [6, 6], [8, 6]], [[3, 9], [5, 9]], [[2, 9], [6, 9]], [[1, 7], [7, 7]], [[1, 9], [7, 9]], [[0, 9], [8, 9]], [[4, 9]]];
    /** 2玩家初始位置 */
    ChessGlobalData.chessStartPoint2 = [[[0, 3], [2, 3], [4, 3], [6, 3], [8, 3]], [[3, 0], [5, 0]], [[2, 0], [6, 0]], [[1, 2], [7, 2]], [[1, 0], [7, 0]], [[0, 0], [8, 0]], [[4, 0]]];
    return ChessGlobalData;
}());
__reflect(ChessGlobalData.prototype, "ChessGlobalData");
//# sourceMappingURL=ChessGlobalData.js.map