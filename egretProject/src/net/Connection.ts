class Connection {
    private _socket: egret.WebSocket;

    private _receiveByteArray: egret.ByteArray;
    private _sendByteArray: egret.ByteArray;

    private _tempByteArray: egret.ByteArray;

    public constructor() {
        this._receiveByteArray = new egret.ByteArray();
        this._sendByteArray = new egret.ByteArray();
        this._tempByteArray = new egret.ByteArray();
        this._socket = new egret.WebSocket();
    }

    public connectionServer() {
        this._socket.type = egret.WebSocket.TYPE_BINARY;
        this._socket.connectByUrl("ws://192.168.21.51:8124");
        this._socket.addEventListener(egret.Event.CONNECT, this.onConnedComplete, this);
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.socketDataHandler, this);
    }

    private socketDataHandler(data: any): void {
        this._socket.readBytes(this._receiveByteArray);
        var cmd:number = this._receiveByteArray.readUnsignedShort();
        this._receiveByteArray.readBytes(this._tempByteArray, 2);
        Outgoing.back(cmd,this._tempByteArray);
        this._tempByteArray.clear();
        this._receiveByteArray.clear();
    }

    private onConnedComplete() {
        this.connectServerSuc();
    }

    private connectServerSuc() {
        var id: number = Math.floor(Math.random() * 10000);
        var name: string = "player" + id;
        var c2s: msg.C2SPlayInitInfo = new msg.C2SPlayInitInfo();
        var info: msg.SPlayerInfo = new msg.SPlayerInfo();
        info.playerId = id;
        info.playerName = name;
        c2s.playerInfo = info;
        GameCache.chessCache.selfInfo = info;

        Outgoing.send("msg.C2SPlayInitInfo", c2s);
    }

    public send(cmd: number, cls, data: any) {
        this._sendByteArray.writeUnsignedShort(cmd);
        this._tempByteArray = new egret.ByteArray(cls.encode(data).finish());
        this._sendByteArray.writeBytes(this._tempByteArray);
        this._socket.writeBytes(this._sendByteArray);
        this._socket.flush();
        this._sendByteArray.clear();
        this._tempByteArray.clear();
    }

}