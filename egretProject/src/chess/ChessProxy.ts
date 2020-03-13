class ChessProxy extends BaseProxy{
	public constructor() {
		super();
	}

	protected addCmds(){
		super.addCmds();
		this.onProto("msg.S2CInitGame",this.onInitGame);
		this.onProto("msg.S2CPlayMoveChess",this.onSMoveChess);
	}

	private onInitGame(obj:msg.S2CInitGame){
		GameCache.chessCache.initGame(obj);
		Dispatcher.dispatchEvent(EventName.InitGame);
	}

	public onMoveChess(originalPos:msg.SChessPos,movePos:msg.SChessPos){
		var obj:msg.C2SMoveChess = new msg.C2SMoveChess();
		var info:msg.SChessMoveInfo = new msg.SChessMoveInfo();
		info.chessPos = originalPos;
		info.movePos = movePos;
		info.playerId = GameCache.chessCache.selfInfo.playerId;
		obj.info = info;
		Outgoing.send("msg.C2SMoveChess",obj);
	}

	public onSMoveChess(obj:msg.S2CPlayMoveChess){
		var moveInfo:msg.SChessMoveInfo = obj.info;
		Dispatcher.dispatchEvent(EventName.MoveChessSuc,moveInfo);
	}
}