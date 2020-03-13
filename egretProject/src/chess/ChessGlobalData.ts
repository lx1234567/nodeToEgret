class ChessGlobalData {
	public constructor() {
	}

	public static cellSize: number = 75;

	public chessIndexName1: { [key: number]: string } = { 1: "兵", 2: "仕", 3: "相", 4: "炮", 5: "马", 6: "車", 7: "帅" };
	public chessIndexName2: { [key: number]: string } = { 1: "卒", 2: "士", 3: "象", 4: "炮", 5: "马", 6: "車", 7: "将" };

    /** 1玩家初始位置 */
	public static chessStartPoint1: number[][][] = [ [[0, 6], [2, 6], [4, 6], [6, 6], [8, 6]], [[3, 9], [5, 9]], [[2, 9], [6, 9]], [[1, 7], [7, 7]], [[1, 9], [7, 9]], [[0, 9], [8, 9]], [[4, 9]]];
	 /** 2玩家初始位置 */
	public static chessStartPoint2: number[][][] = [ [[0, 3], [2, 3], [4, 3], [6, 3], [8, 3]], [[3, 0], [5, 0]], [[2, 0], [6, 0]], [[1, 2], [7, 2]], [[1, 0], [7, 0]], [[0, 0], [8, 0]], [[4, 0]]];

	public static BING:number = 1;
	public static SHI:number = 2;
	public static XIANG:number = 3;
	public static PAO:number = 4;
	public static MA:number = 5;
	public static JU:number = 6;
	public static JIANG:number = 7;

}