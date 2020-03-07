var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChessBoard = /** @class */ (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard() {
        var _this = _super.call(this) || this;
        _this._chessCellSize = 75;
        _this._startX = 10;
        _this._startY = 100;
        return _this;
    }
    ChessBoard.prototype.init = function () {
        this.initBoard();
    };
    /** 初始化棋盘 */
    ChessBoard.prototype.initBoard = function () {
        this.width = this._chessCellSize * 8;
        this.height = this._chessCellSize * 9;
        this.x = this._startX;
        this.y = this._startY;
        this.graphics.lineStyle(3, 0x000000, 1);
        this.graphics.drawRect(-8, -8, this.width + 16, this.height + 16);
        this.graphics.lineStyle(2, 0x000000, 1);
        this.graphics.drawRect(0, 0, this.width, this.height);
        var i;
        for (i = 0; i < 8; i++) {
            this.graphics.moveTo(0, (i + 1) * this._chessCellSize);
            this.graphics.lineTo(this._chessCellSize * 8, (i + 1) * this._chessCellSize);
        }
        for (i = 0; i < 7; i++) {
            this.graphics.moveTo((i + 1) * this._chessCellSize, 0);
            this.graphics.lineTo((i + 1) * this._chessCellSize, 4 * this._chessCellSize);
            this.graphics.moveTo((i + 1) * this._chessCellSize, 5 * this._chessCellSize);
            this.graphics.lineTo((i + 1) * this._chessCellSize, 9 * this._chessCellSize);
        }
        this.drawLine(3 * this._chessCellSize, 0, 5 * this._chessCellSize, 2 * this._chessCellSize);
        this.drawLine(3 * this._chessCellSize, 2 * this._chessCellSize, 5 * this._chessCellSize, 0);
        this.drawLine(3 * this._chessCellSize, 7 * this._chessCellSize, 5 * this._chessCellSize, 9 * this._chessCellSize);
        this.drawLine(3 * this._chessCellSize, 9 * this._chessCellSize, 5 * this._chessCellSize, 7 * this._chessCellSize);
        this.drawForuLine(this._chessCellSize, 2 * this._chessCellSize);
        this.drawForuLine(this._chessCellSize, 6 * this._chessCellSize);
        this.drawForuLine(7 * this._chessCellSize, 6 * this._chessCellSize);
        this.drawForuLine(7 * this._chessCellSize, 2 * this._chessCellSize);
        this._text1 = new egret.TextField();
        this._text2 = new egret.TextField();
        this._text1.size = this._text2.size = 30;
        this._text1.bold = this._text2.bold = true;
        this._text1.textColor = this._text2.textColor = 0x000000;
        this._text1.text = "楚河";
        this._text1.x = 1 * this._chessCellSize + this._chessCellSize / 2 + 10;
        this._text1.y = 4 * this._chessCellSize + 25;
        this.addChild(this._text1);
        this._text2.text = "汉界";
        this._text2.x = 5 * this._chessCellSize + this._chessCellSize / 2 + 10;
        this._text2.y = 4 * this._chessCellSize + 25;
        this.addChild(this._text2);
    };
    ChessBoard.prototype.drawLine = function (startX, startY, endX, endY) {
        this.graphics.moveTo(startX, startY);
        this.graphics.lineTo(endX, endY);
    };
    /** 炮位线 ,开始点*/
    ChessBoard.prototype.drawForuLine = function (startX, startY, distance, size) {
        if (distance === void 0) { distance = 4; }
        if (size === void 0) { size = 10; }
        this.graphics.moveTo(startX - distance, startY - distance);
        this.graphics.lineTo(startX - distance - size, startY - distance);
        this.graphics.moveTo(startX - distance, startY - distance);
        this.graphics.lineTo(startX - distance, startY - distance - size);
        this.graphics.moveTo(startX + distance, startY - distance);
        this.graphics.lineTo(startX + distance + size, startY - distance);
        this.graphics.moveTo(startX + distance, startY - distance);
        this.graphics.lineTo(startX + distance, startY - distance - size);
        this.graphics.moveTo(startX - distance, startY + distance);
        this.graphics.lineTo(startX - distance - size, startY + distance);
        this.graphics.moveTo(startX - distance, startY + distance);
        this.graphics.lineTo(startX - distance, startY + distance + size);
        this.graphics.moveTo(startX + distance, startY + distance);
        this.graphics.lineTo(startX + distance + size, startY + distance);
        this.graphics.moveTo(startX + distance, startY + distance);
        this.graphics.lineTo(startX + distance, startY + distance + size);
    };
    return ChessBoard;
}(egret.Sprite));
