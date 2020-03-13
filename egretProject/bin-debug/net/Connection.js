var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Connection = (function () {
    function Connection() {
        this._receiveByteArray = new egret.ByteArray();
        this._sendByteArray = new egret.ByteArray();
        this._tempByteArray = new egret.ByteArray();
        this._socket = new egret.WebSocket();
    }
    Connection.prototype.connectionServer = function () {
        this._socket.type = egret.WebSocket.TYPE_BINARY;
        this._socket.connectByUrl("ws://192.168.21.51:8124");
        this._socket.addEventListener(egret.Event.CONNECT, this.onConnedComplete, this);
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.socketDataHandler, this);
    };
    Connection.prototype.socketDataHandler = function (data) {
        this._socket.readBytes(this._receiveByteArray);
        var cmd = this._receiveByteArray.readUnsignedShort();
        this._receiveByteArray.readBytes(this._tempByteArray, 2);
        Outgoing.back(cmd, this._tempByteArray);
        this._tempByteArray.clear();
        this._receiveByteArray.clear();
    };
    Connection.prototype.onConnedComplete = function () {
        this.connectServerSuc();
    };
    Connection.prototype.connectServerSuc = function () {
        var id = Math.floor(Math.random() * 10000);
        var name = "player" + id;
        var c2s = new msg.C2SPlayInitInfo();
        var info = new msg.SPlayerInfo();
        info.playerId = id;
        info.playerName = name;
        c2s.playerInfo = info;
        GameCache.chessCache.selfInfo = info;
        Outgoing.send("msg.C2SPlayInitInfo", c2s);
    };
    Connection.prototype.send = function (cmd, cls, data) {
        this._sendByteArray.writeUnsignedShort(cmd);
        this._tempByteArray = new egret.ByteArray(cls.encode(data).finish());
        this._sendByteArray.writeBytes(this._tempByteArray);
        this._socket.writeBytes(this._sendByteArray);
        this._socket.flush();
        this._sendByteArray.clear();
        this._tempByteArray.clear();
    };
    return Connection;
}());
__reflect(Connection.prototype, "Connection");
//# sourceMappingURL=Connection.js.map