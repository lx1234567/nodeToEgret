class Session {
	public constructor() {
	}

	private _bindProtoClass:any;
	private _bindProtoNum:any;
	private _bindNumProto:any;

	private _bindNumHandle:any;

	public init(obj:any){
		this._bindProtoClass = {};
		this._bindProtoNum = {};
		this._bindNumProto = {};
		for(var key in obj){
			var classString:string = key;
			var cmd:number = obj[key];

			this._bindNumProto[cmd] = classString;
			this._bindProtoNum[classString] = cmd;
			var classType:any = egret.getDefinitionByName(classString);
			this._bindProtoClass[classString] = classType;
		}
	}

	public getCmdByProto(proto:string):number{
		return this._bindProtoNum[proto];
	}

	public getClassByProto(proto:string):any{
		return this._bindProtoClass[proto];
	}

	public getClassByCmd(cmd:number):any{
		return this._bindProtoClass[this._bindNumProto[cmd]];
	}

	public bind(proto:string,handle:Handler){
		if(!this._bindNumHandle){
			this._bindNumHandle = {};
		}

		this._bindNumHandle[this._bindProtoNum[proto]] = handle;
	}

	public getHandleByCmd(cmd:number):Handler{
		return this._bindNumHandle[cmd];
	}
}