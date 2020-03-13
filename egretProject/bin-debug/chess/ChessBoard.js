var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard() {
        var _this = _super.call(this) || this;
        _this._chessCellSize = ChessGlobalData.cellSize;
        _this._startX = 10;
        _this._startY = 100;
        _this._routeImgArr = [];
        _this._routeImgPool = [];
        _this._selectedChessRoutePointArr = [];
        //测试
        _this._originalPos = new msg.SChessPos();
        _this._movePos = new msg.SChessPos();
        _this._clickCount = 0;
        return _this;
    }
    ChessBoard.prototype.init = function () {
        this.initBoard();
        this.initChess();
    };
    /** 初始化棋盘 */
    ChessBoard.prototype.initBoard = function () {
        this.width = this._chessCellSize * 8;
        this.height = this._chessCellSize * 9;
        var bgTexture = RES.getRes("bg_png");
        this._bgImg = new egret.Bitmap();
        this._bgImg.texture = bgTexture;
        this.addChild(this._bgImg);
        this._bgImg.x = -38;
        this._bgImg.y = -43;
        this._bgImg.width = this.width + 93;
        this._bgImg.height = this.height + 80;
        this.x = this._startX;
        this.y = this._startY;
        // this.graphics.lineStyle(3, 0x000000, 1);
        // this.graphics.drawRect(-8, -8, this.width + 16, this.height + 16);
        // this.graphics.lineStyle(2, 0x000000, 1);
        // this.graphics.drawRect(0, 0, this.width, this.height);
        // var i: number;
        // for (i = 0; i < 8; i++) {
        // 	this.graphics.moveTo(0, (i + 1) * this._chessCellSize);
        // 	this.graphics.lineTo(this._chessCellSize * 8, (i + 1) * this._chessCellSize);
        // }
        // for (i = 0; i < 7; i++) {
        // 	this.graphics.moveTo((i + 1) * this._chessCellSize, 0);
        // 	this.graphics.lineTo((i + 1) * this._chessCellSize, 4 * this._chessCellSize);
        // 	this.graphics.moveTo((i + 1) * this._chessCellSize, 5 * this._chessCellSize);
        // 	this.graphics.lineTo((i + 1) * this._chessCellSize, 9 * this._chessCellSize);
        // }
        // this.drawLine(3 * this._chessCellSize, 0, 5 * this._chessCellSize, 2 * this._chessCellSize);
        // this.drawLine(3 * this._chessCellSize, 2 * this._chessCellSize, 5 * this._chessCellSize, 0);
        // this.drawLine(3 * this._chessCellSize, 7 * this._chessCellSize, 5 * this._chessCellSize, 9 * this._chessCellSize);
        // this.drawLine(3 * this._chessCellSize, 9 * this._chessCellSize, 5 * this._chessCellSize, 7 * this._chessCellSize);
        // this.drawForuLine(this._chessCellSize, 2 * this._chessCellSize);
        // this.drawForuLine(this._chessCellSize, 7 * this._chessCellSize);
        // this.drawForuLine(7 * this._chessCellSize, 7 * this._chessCellSize);
        // this.drawForuLine(7 * this._chessCellSize, 2 * this._chessCellSize);
        // this._text1 = new egret.TextField();
        // this._text2 = new egret.TextField();
        // this._text1.size = this._text2.size = 30;
        // this._text1.bold = this._text2.bold = true;
        // this._text1.textColor = this._text2.textColor = 0x000000;
        // this._text1.text = "口"
        // this._text1.x = 1 * this._chessCellSize + this._chessCellSize / 2 + 10;
        // this._text1.y = 4 * this._chessCellSize + 25;
        // this._text1.x = 0;
        // this._text1.y = 0;
        // this.addChild(this._text1);
        // this._text2.text = "汉界"
        // this._text2.x = 5 * this._chessCellSize + this._chessCellSize / 2 + 10;
        // this._text2.y = 4 * this._chessCellSize + 25;
        // this.addChild(this._text2);
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
    ChessBoard.prototype.onFirstClickChessBoard = function (e) {
        var x = e.stageX;
        var y = e.stageY;
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
    };
    ChessBoard.prototype.onSecondClickChessBoard = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        if (!this._tempPoint) {
            this._tempPoint = new egret.Point();
        }
        this._tempPoint = this.globalToLocal(x, y, this._tempPoint);
        this._tempPoint = ChessUtil.getClickChessBoardXY(this._tempPoint, this._chessCellSize, this._tempPoint);
        if (!this._tempPoint) {
            if (this._selectedChess) {
                this._selectedChess.setChessIsSelected(false);
                this._selectedChess = null;
                this.clearAllRouteImg();
            }
            return false;
        }
        var chess = this._playerSelfChessObj[this._tempPoint.x + "_" + this._tempPoint.y];
        if (chess) {
            if (this._selectedChess) {
                this._selectedChess.setChessIsSelected(false);
            }
            this._selectedChess = chess;
            this._selectedChess.setChessIsSelected(true);
            this.updateSelectedChess();
            return true;
        }
        return false;
    };
    ChessBoard.prototype.onClickChessBoard = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        if (!this._tempPoint) {
            this._tempPoint = new egret.Point();
        }
        this._tempPoint = this.globalToLocal(x, y, this._tempPoint);
        this._tempPoint = ChessUtil.getClickChessBoardXY(this._tempPoint, this._chessCellSize, this._tempPoint);
        if (!this._tempPoint) {
            console.log("未点击有效位置");
        }
        else {
            if (this._clickCount == 0) {
                this._originalPos.x = this._tempPoint.x;
                this._originalPos.y = this._tempPoint.y;
                this._clickCount++;
            }
            else if (this._clickCount == 1) {
                this._movePos.x = this._tempPoint.x;
                this._movePos.y = this._tempPoint.y;
                this._clickCount = 0;
                GameProxy.chessProxy.onMoveChess(this._originalPos, this._movePos);
            }
            console.log("x:" + this._tempPoint.x + "y:" + this._tempPoint.y);
        }
    };
    //初始化棋子
    ChessBoard.prototype.initChess = function () {
        this._playerSelfChess = [];
        this._playerOtherChess = [];
        this._playerOtherChessObj = {};
        this._playerSelfChessObj = {};
        var i, j, k;
        var selfInfo = GameCache.chessCache.selfInitInfo;
        var otherInfo = GameCache.chessCache.elseInitInfo;
        for (i = 0; i < 7; i++) {
            var colorIndex = selfInfo.colorIndex;
            var point = ChessGlobalData.chessStartPoint1[i];
            for (j = 0; j < point.length; j++) {
                var chess = new Chess();
                chess.initChess(colorIndex, i + 1);
                chess.setPoint(new egret.Point(point[j][0], point[j][1]));
                this._playerSelfChess.push(chess);
                this._playerSelfChessObj[point[j][0] + "_" + point[j][1]] = chess;
            }
        }
        for (k = 0; k < this._playerSelfChess.length; k++) {
            this.addChild(this._playerSelfChess[k]);
        }
        for (i = 0; i < 7; i++) {
            var point = ChessGlobalData.chessStartPoint2[i];
            var colorIndex1 = otherInfo.colorIndex;
            for (j = 0; j < point.length; j++) {
                var chess = new Chess();
                chess.initChess(colorIndex1, i + 1);
                chess.setPoint(new egret.Point(point[j][0], point[j][1]));
                this._playerOtherChess.push(chess);
                this._playerOtherChessObj[point[j][0] + "_" + point[j][1]] = chess;
            }
        }
        for (k = 0; k < this._playerOtherChess.length; k++) {
            this.addChild(this._playerOtherChess[k]);
        }
    };
    ChessBoard.prototype.onMoveChessSuc = function (e) {
        var obj = e.data;
        var i;
        if (obj.playerId == GameCache.chessCache.selfInfo.playerId) {
            for (i = 0; i < this._playerSelfChess.length; i++) {
                var chess = this._playerSelfChess[i];
                if (chess.getChessX() == obj.chessPos.x && chess.getChessY() == obj.chessPos.y) {
                    chess.setPoint(new egret.Point(obj.movePos.x, obj.movePos.y));
                    break;
                }
            }
        }
        else {
            for (i = 0; i < this._playerOtherChess.length; i++) {
                var chess = this._playerOtherChess[i];
                var posY = 9 - obj.chessPos.y;
                var posX = 8 - obj.chessPos.x;
                var endY = 9 - obj.movePos.y;
                var endX = 8 - obj.movePos.x;
                if (chess.getChessX() == posX && chess.getChessY() == posY) {
                    chess.setPoint(new egret.Point(endX, endY));
                    break;
                }
            }
        }
    };
    ChessBoard.prototype.updateSelectedChess = function () {
        this.clearAllRouteImg();
        var chessType = this._selectedChess.getChessType();
        var pointX = this._selectedChess.getChessX();
        var pointY = this._selectedChess.getChessY();
        ChessUtil.getAllRoutePointByChess(chessType, pointX, pointY, this._selectedChessRoutePointArr);
        for (var i = 0; i < this._selectedChessRoutePointArr.length; i++) {
            var point = this._selectedChessRoutePointArr[i];
            var routeImage = this._routeImgPool.pop();
            if (!routeImage) {
                routeImage = new egret.Bitmap();
                var textTure = RES.getRes("dot_png");
                routeImage.texture = textTure;
            }
            routeImage.x = point.x * ChessGlobalData.cellSize - 18;
            routeImage.y = point.y * ChessGlobalData.cellSize - 23;
            this.addChild(routeImage);
            this._routeImgArr.push(routeImage);
        }
    };
    ChessBoard.prototype.clearAllRouteImg = function () {
        while (this._routeImgArr.length) {
            var routeImg = this._routeImgArr.shift();
            if (routeImg.parent) {
                routeImg.parent.removeChild(routeImg);
                routeImg.x = routeImg.y = 0;
            }
            this._routeImgPool.push(routeImg);
        }
        while (this._selectedChessRoutePointArr.length) {
            var point = this._selectedChessRoutePointArr.shift();
            point.x = point.y = 0;
        }
    };
    return ChessBoard;
}(egret.Sprite));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map