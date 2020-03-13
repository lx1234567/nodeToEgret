class ChessCache {
	public constructor() {
	}

    /** 自己的信息 */
	public selfInfo:msg.SPlayerInfo;
	/**对弈玩家信息 */
	public elseInfo:msg.SPlayerInfo;

	public selfInitInfo:msg.SChessInitInfo;
	public elseInitInfo:msg.SChessInitInfo;

	public initGame(obj:msg.S2CInitGame){
		var playerInit1:msg.SChessInitInfo = obj.player1;
		var playerInit2:msg.SChessInitInfo = obj.player2;
		if(playerInit1.playerId == this.selfInfo.playerId){
			this.selfInitInfo = playerInit1;
			this.elseInitInfo = playerInit2;
			this.elseInfo = new msg.SPlayerInfo();
			this.elseInfo.playerId = playerInit2.playerId;
		}
		else{
			this.selfInitInfo = playerInit2;
			this.elseInitInfo = playerInit1;
			this.elseInfo = new msg.SPlayerInfo();
			this.elseInfo.playerId = playerInit1.playerId;
		}
	}
}