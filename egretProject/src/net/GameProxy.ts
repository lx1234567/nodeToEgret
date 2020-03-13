class GameProxy {
	public constructor() {
	}

	public static chessProxy:ChessProxy;

	public static init(){
		GameProxy.chessProxy = new ChessProxy();
	}
}