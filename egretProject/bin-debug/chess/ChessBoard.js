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
    };
    //初始化棋子
    ChessBoard.prototype.initChess = function () {
        this._playerOtherChessDataArr = [];
        this._playerSelfChessDataArr = [];
        this._playerSelfChess = [];
        this._playerOtherChess = [];
        this._playerOtherChessObj = {};
        this._playerSelfChessObj = {};
        var i, j, k, chessPoint, chessData, chess;
        var selfInfo = GameCache.chessCache.selfInitInfo;
        var otherInfo = GameCache.chessCache.elseInitInfo;
        for (i = 0; i < 7; i++) {
            var colorIndex = selfInfo.colorIndex;
            var point = ChessGlobalData.chessStartPoint1[i];
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
            var colorIndex = otherInfo.colorIndex;
            var point = ChessGlobalData.chessStartPoint2[i];
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
    };
    ChessBoard.prototype.onMoveChessSuc = function (e) {
        var obj = e.data;
        var i;
        var j;
        var posX;
        var posY;
        var endX;
        var endY;
        var chessArr;
        var chess;
        var chessData;
        var chessData1;
        var newPoint;
        var moveChess;
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
                        var index = this._playerOtherChess.indexOf(moveChess);
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
                        var index = this._playerSelfChess.indexOf(moveChess);
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
                console.log("您已输棋");
                return;
            }
        }
    };
    ChessBoard.prototype.updateSelectedChess = function () {
        this.clearAllRouteImg();
        var chessType = this._selectedChess.getChessType();
        var pointX = this._selectedChess.getChessX();
        var pointY = this._selectedChess.getChessY();
        this._selectedChessRoutePointArr = ChessUtil.getChessAllCanMovePos(this._selectedChess.getChessData(), this._playerSelfChessDataArr, this._playerOtherChessDataArr);
        for (var i = 0; i < this._selectedChessRoutePointArr.length; i++) {
            var point = this._selectedChessRoutePointArr[i];
            if (!this._playerOtherChessObj[point.x + "_" + point.y]) {
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
            ObjectPool.push(point);
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
    /** 判移(被将情况无法移动) */
    ChessBoard.prototype.isCanMove = function (startX, startY, endX, endY) {
        var chessData1;
        var chessData2;
        var chess1;
        var chess2;
        var tempChessData;
        var i;
        var selfJiangData;
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
        var result = !ChessUtil.isCheck(this._playerSelfChessDataArr, this._playerOtherChessDataArr);
        //还原棋盘
        chessData1.pos.x = startX;
        chessData1.pos.y = startY;
        if (chessData2) {
            this._playerOtherChessDataArr.push(chessData2);
        }
        return result;
    };
    //判死，自己是否被对面将死
    ChessBoard.prototype.isYetLose = function () {
        var selfJiangData;
        var i;
        var tempChessData;
        var jiangChessArr = [];
        for (i = 0; i < this._playerSelfChessDataArr.length; i++) {
            if (tempChessData.chessType == ChessGlobalData.JIANG) {
                selfJiangData = tempChessData;
            }
        }
        for (i = 0; i < this._playerOtherChessDataArr.length; i++) {
            tempChessData = this._playerOtherChessDataArr[i];
            if (tempChessData.chessType == ChessGlobalData.BING || tempChessData.chessType == ChessGlobalData.JU || tempChessData.chessType == ChessGlobalData.MA || tempChessData.chessType == ChessGlobalData.PAO) {
                // if (this.isCanTakeChess(tempChessData.chessType, tempChessData.pos.x, tempChessData.pos.y, selfJiangData.pos.x, selfJiangData.pos.y, false)) {
                // 	jiangChessArr.push(tempChessData);
                // }
            }
        }
        if (jiangChessArr.length) {
            for (i = 0; i < jiangChessArr.length; i++) {
            }
        }
        return false;
    };
    return ChessBoard;
}(egret.Sprite));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map