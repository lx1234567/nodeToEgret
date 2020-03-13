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
        _this._originalPos = new msg.SChessPos();
        _this._movePos = new msg.SChessPos();
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
        if (!this._isCanMoveChess) {
            return false;
        }
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
        if (!this._isCanMoveChess) {
            return true;
        }
        var x = e.stageX;
        var y = e.stageY;
        if (!this._tempPoint) {
            this._tempPoint = new egret.Point();
        }
        this._tempPoint = this.globalToLocal(x, y, this._tempPoint);
        this._tempPoint = ChessUtil.getClickChessBoardXY(this._tempPoint, this._chessCellSize, this._tempPoint);
        if (!this._tempPoint) {
            return true;
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
        //点击别人判吃
        chess = this._playerOtherChessObj[this._tempPoint.x + "_" + this._tempPoint.y];
        if (chess) {
            if (this.isCanTakeChess(this._selectedChess.getChessType(), this._selectedChess.getChessX(), this._selectedChess.getChessY(), chess.getChessX(), chess.getChessY())) {
                this._originalPos.x = this._selectedChess.getChessX();
                this._originalPos.y = this._selectedChess.getChessY();
                this._movePos.x = this._tempPoint.x;
                this._movePos.y = this._tempPoint.y;
                GameProxy.chessProxy.onMoveChess(this._originalPos, this._movePos);
                this.clearCurSelectedChess();
                return false;
            }
            return true;
        }
        if (this.routeArrIsContainer(this._tempPoint)) {
            this._originalPos.x = this._selectedChess.getChessX();
            this._originalPos.y = this._selectedChess.getChessY();
            this._movePos.x = this._tempPoint.x;
            this._movePos.y = this._tempPoint.y;
            GameProxy.chessProxy.onMoveChess(this._originalPos, this._movePos);
        }
        else {
            return true;
        }
        this.clearCurSelectedChess();
        return false;
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
        if (selfInfo.colorIndex == 1) {
            this._isCanMoveChess = true;
        }
    };
    ChessBoard.prototype.onMoveChessSuc = function (e) {
        var obj = e.data;
        var i;
        var posX;
        var posY;
        var endX;
        var endY;
        var chessArr;
        var chess;
        var newPoint;
        var moveChess;
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
            for (i = 0; i < this._playerSelfChess.length; i++) {
                chess = this._playerSelfChess[i];
                if (chess.getChessX() == posX && chess.getChessY() == posY) {
                    if (this._playerSelfChessObj[posX + "_" + posY]) {
                        delete this._playerSelfChessObj[posX + "_" + posY];
                    }
                    if (this._playerOtherChessObj[endX + "_" + endY]) {
                        moveChess = this._playerOtherChessObj[endX + "_" + endY];
                        var index = this._playerOtherChess.indexOf(moveChess);
                        if (index != -1) {
                            this._playerOtherChess.splice(index, 1);
                        }
                        delete this._playerOtherChessObj[endX + "_" + endY];
                        this.removeChild(moveChess);
                    }
                    newPoint = ObjectPool.pop("egret.Point");
                    newPoint.x = endX;
                    newPoint.y = endY;
                    chess.setPoint(newPoint);
                    this._playerSelfChessObj[endX + "_" + endY] = chess;
                    break;
                }
            }
        }
        else {
            for (i = 0; i < this._playerOtherChess.length; i++) {
                chess = this._playerOtherChess[i];
                if (chess.getChessX() == posX && chess.getChessY() == posY) {
                    if (this._playerOtherChessObj[posX + "_" + posY]) {
                        delete this._playerOtherChessObj[posX + "_" + posY];
                    }
                    if (this._playerSelfChessObj[endX + "_" + endY]) {
                        moveChess = this._playerSelfChessObj[endX + "_" + endY];
                        var index = this._playerOtherChess.indexOf(moveChess);
                        if (index != -1) {
                            this._playerSelfChess.splice(index, 1);
                        }
                        delete this._playerSelfChessObj[endX + "_" + endY];
                        this.removeChild(moveChess);
                    }
                    newPoint = ObjectPool.pop("egret.Point");
                    newPoint.x = endX;
                    newPoint.y = endY;
                    chess.setPoint(newPoint);
                    this._playerOtherChessObj[endX + "_" + endY] = chess;
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
        this.checkRouteArr();
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
    ChessBoard.prototype.clearCurSelectedChess = function () {
        if (this._selectedChess) {
            this._selectedChess.setChessIsSelected(false);
            this._selectedChess = null;
            this.clearAllRouteImg();
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
    ChessBoard.prototype.checkRouteArr = function () {
        var i;
        var j;
        var point;
        var chessPointX;
        var chessPointY;
        if (this._selectedChess && this._selectedChessRoutePointArr && this._selectedChessRoutePointArr.length) {
            if (this._selectedChess.getChessType() == ChessGlobalData.BING || this._selectedChess.getChessType() == ChessGlobalData.SHI || this._selectedChess.getChessType() == ChessGlobalData.JIANG) {
                for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                    point = this._selectedChessRoutePointArr[i];
                    if (this._playerSelfChessObj[point.x + "_" + point.y] || this._playerOtherChessObj[point.x + "_" + point.y]) {
                        this._selectedChessRoutePointArr.splice(i, 1);
                        i--;
                        ObjectPool.push(point);
                    }
                }
            }
            else if (this._selectedChess.getChessType() == ChessGlobalData.PAO || this._selectedChess.getChessType() == ChessGlobalData.JU) {
                chessPointX = this._selectedChess.getChessX();
                chessPointY = this._selectedChess.getChessY();
                //需要优化
                for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                    point = this._selectedChessRoutePointArr[i];
                    if (point.x == chessPointX) {
                        if (point.y < chessPointY) {
                            for (j = point.y; j < chessPointY; j++) {
                                if (this._playerSelfChessObj[point.x + "_" + j] || this._playerOtherChessObj[point.x + "_" + j]) {
                                    this._selectedChessRoutePointArr.splice(i, 1);
                                    i--;
                                    ObjectPool.push(point);
                                    break;
                                }
                            }
                        }
                        else {
                            for (j = chessPointY + 1; j <= point.y; j++) {
                                if (this._playerSelfChessObj[point.x + "_" + j] || this._playerOtherChessObj[point.x + "_" + j]) {
                                    this._selectedChessRoutePointArr.splice(i, 1);
                                    i--;
                                    ObjectPool.push(point);
                                    break;
                                }
                            }
                        }
                    }
                    else if (point.y == chessPointY) {
                        if (point.x < chessPointX) {
                            for (j = point.x; j < chessPointX; j++) {
                                if (this._playerSelfChessObj[j + "_" + point.y] || this._playerOtherChessObj[j + "_" + point.y]) {
                                    this._selectedChessRoutePointArr.splice(i, 1);
                                    i--;
                                    ObjectPool.push(point);
                                    break;
                                }
                            }
                        }
                        else {
                            for (j = chessPointX + 1; j <= point.x; j++) {
                                if (this._playerSelfChessObj[j + "_" + point.y] || this._playerOtherChessObj[j + "_" + point.y]) {
                                    this._selectedChessRoutePointArr.splice(i, 1);
                                    i--;
                                    ObjectPool.push(point);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else if (this._selectedChess.getChessType() == ChessGlobalData.MA) {
                for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                    point = this._selectedChessRoutePointArr[i];
                    if (this._playerSelfChessObj[point.x + "_" + point.y] || this._playerOtherChessObj[point.x + "_" + point.y]) {
                        this._selectedChessRoutePointArr.splice(i, 1);
                        i--;
                        ObjectPool.push(point);
                    }
                }
                if (this._selectedChessRoutePointArr.length) {
                    chessPointX = this._selectedChess.getChessX();
                    chessPointY = this._selectedChess.getChessY();
                    for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                        point = this._selectedChessRoutePointArr[i];
                        if (point.y == chessPointY + 2) {
                            if (this._playerSelfChessObj[chessPointX + "_" + (chessPointY + 1)] || this._playerOtherChessObj[chessPointX + "_" + (chessPointY + 1)]) {
                                this._selectedChessRoutePointArr.splice(i, 1);
                                i--;
                                ObjectPool.push(point);
                            }
                        }
                        else if (point.y == chessPointY - 2) {
                            if (this._playerSelfChessObj[chessPointX + "_" + (chessPointY - 1)] || this._playerOtherChessObj[chessPointX + "_" + (chessPointY - 1)]) {
                                this._selectedChessRoutePointArr.splice(i, 1);
                                i--;
                                ObjectPool.push(point);
                            }
                        }
                        else if (point.x == chessPointX + 2) {
                            if (this._playerSelfChessObj[(chessPointX + 1) + "_" + chessPointY] || this._playerOtherChessObj[(chessPointX + 1) + "_" + chessPointY]) {
                                this._selectedChessRoutePointArr.splice(i, 1);
                                i--;
                                ObjectPool.push(point);
                            }
                        }
                        else if (point.x == chessPointX - 2) {
                            if (this._playerSelfChessObj[(chessPointX - 1) + "_" + chessPointY] || this._playerOtherChessObj[(chessPointX - 1) + "_" + chessPointY]) {
                                this._selectedChessRoutePointArr.splice(i, 1);
                                i--;
                                ObjectPool.push(point);
                            }
                        }
                    }
                }
            }
            else if (this._selectedChess.getChessType() == ChessGlobalData.XIANG) {
                for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                    point = this._selectedChessRoutePointArr[i];
                    if (this._playerSelfChessObj[point.x + "_" + point.y] || this._playerOtherChessObj[point.x + "_" + point.y]) {
                        this._selectedChessRoutePointArr.splice(i, 1);
                        i--;
                        ObjectPool.push(point);
                    }
                }
                if (this._selectedChessRoutePointArr.length) {
                    chessPointX = this._selectedChess.getChessX();
                    chessPointY = this._selectedChess.getChessY();
                    for (i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                        point = this._selectedChessRoutePointArr[i];
                        var disX = point.x - chessPointX;
                        var disY = point.y - chessPointY;
                        disX = disX < 0 ? -1 : 1;
                        disY = disY < 0 ? -1 : 1;
                        if (this._playerSelfChessObj[(chessPointX + disX) + "_" + (chessPointY + disY)] || this._playerOtherChessObj[(chessPointX + disX) + "_" + (chessPointY + disY)]) {
                            this._selectedChessRoutePointArr.splice(i, 1);
                            i--;
                            ObjectPool.push(point);
                        }
                    }
                }
            }
        }
    };
    ChessBoard.prototype.routeArrIsContainer = function (point) {
        if (this._selectedChessRoutePointArr && this._selectedChessRoutePointArr.length) {
            for (var i = 0; i < this._selectedChessRoutePointArr.length; i++) {
                var routePoint = this._selectedChessRoutePointArr[i];
                if (routePoint.x == point.x && routePoint.y == point.y) {
                    return true;
                }
            }
        }
        return false;
    };
    //===判吃
    ChessBoard.prototype.isCanTakeChess = function (chessType, chessX, chessY, otherChessX, otherChessY) {
        var result = false;
        if (chessType == ChessGlobalData.BING) {
            result = this.IsBingCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.SHI) {
            result = this.IsShiCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.XIANG) {
            result = this.IsXiangCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.PAO) {
            result = this.IsPaoCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.MA) {
            result = this.IsMaCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.JU) {
            result = this.IsJuCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        else if (chessType == ChessGlobalData.JIANG) {
            result = this.IsJiangCanTakeChess(chessX, chessY, otherChessX, otherChessY);
        }
        return result;
    };
    ChessBoard.prototype.IsBingCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if (chessY <= 4) {
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
    };
    ChessBoard.prototype.IsShiCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if (Math.abs(otherChessX - chessX) == 1 && Math.abs(otherChessY - chessY) == 1) {
            return true;
        }
        return false;
    };
    ChessBoard.prototype.IsXiangCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if (Math.abs(otherChessX - chessX) == 2 && Math.abs(otherChessY - chessY) == 2) {
            var disX = otherChessX - chessX;
            var disY = otherChessY - chessY;
            disX = disX > 0 ? 1 : -1;
            disY = disY > 0 ? 1 : -1;
            if (!this._playerSelfChessObj[(chessX + disX) + "_" + (chessY + disY)] && !this._playerOtherChessObj[(chessX + disX) + "_" + (chessY + disY)]) {
                return true;
            }
        }
        return false;
    };
    ChessBoard.prototype.IsPaoCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if ((Math.abs(otherChessX - chessX) && !Math.abs(otherChessY - chessY)) || (!Math.abs(otherChessX - chessX) && Math.abs(otherChessY - chessY))) {
            var i;
            var startIndex;
            var endIndex;
            var count = 0;
            if (Math.abs(otherChessY - chessY)) {
                startIndex = Math.min(otherChessY, chessY);
                endIndex = Math.max(otherChessY, chessY);
                for (i = startIndex + 1; i < endIndex; i++) {
                    if (this._playerOtherChessObj[chessX + "_" + i] || this._playerSelfChessObj[chessX + "_" + i]) {
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
                    if (this._playerOtherChessObj[i + "_" + chessY] || this._playerSelfChessObj[i + "_" + chessY]) {
                        count++;
                    }
                }
                if (count == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    ChessBoard.prototype.IsJuCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if ((Math.abs(otherChessX - chessX) && !Math.abs(otherChessY - chessY)) || (!Math.abs(otherChessX - chessX) && Math.abs(otherChessY - chessY))) {
            var i;
            var startIndex;
            var endIndex;
            var count = 0;
            if (Math.abs(otherChessY - chessY)) {
                startIndex = Math.min(otherChessY, chessY);
                endIndex = Math.max(otherChessY, chessY);
                if (Math.abs(startIndex - endIndex) == 1) {
                    return true;
                }
                for (i = startIndex + 1; i < endIndex; i++) {
                    if (this._playerOtherChessObj[chessX + "_" + i] || this._playerSelfChessObj[chessX + "_" + i]) {
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
                    if (this._playerOtherChessObj[i + "_" + chessY] || this._playerSelfChessObj[i + "_" + chessY]) {
                        count++;
                    }
                }
                if (count == 0) {
                    return true;
                }
            }
        }
        return false;
    };
    ChessBoard.prototype.IsMaCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if ((Math.abs(otherChessX - chessX) == 1 && Math.abs(otherChessY - chessY) == 2) || (Math.abs(otherChessX - chessX) == 2 && Math.abs(otherChessY - chessY) == 1)) {
            var disX = otherChessX - chessX;
            var disY = otherChessY - chessY;
            if (Math.abs(disX) == 2) {
                disY = 0;
                disX = disX > 0 ? 1 : -1;
            }
            else if (Math.abs(disY) == 2) {
                disX = 0;
                disY = disY > 0 ? 1 : -1;
            }
            if (!this._playerOtherChessObj[(chessX + disX) + "_" + (chessY + disY)] && !this._playerSelfChessObj[(chessX + disX) + "_" + (chessY + disY)]) {
                return true;
            }
        }
        return false;
    };
    ChessBoard.prototype.IsJiangCanTakeChess = function (chessX, chessY, otherChessX, otherChessY) {
        if (otherChessX >= 3 && otherChessX <= 5 && otherChessY >= 7 && otherChessY <= 9) {
            if ((Math.abs(otherChessX - chessX) == 1 && otherChessY == chessY) || (Math.abs(chessY - otherChessY) == 1 && otherChessX == chessX)) {
                return true;
            }
        }
        return false;
    };
    return ChessBoard;
}(egret.Sprite));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map