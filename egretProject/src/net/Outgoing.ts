class Outgoing {
	public constructor() {
	}

	public static connection:Connection;
	public static session:Session;

	public static init(obj:any){
		Outgoing.session = new Session();
		Outgoing.session.init(obj);
		Outgoing.connection = new Connection();
	}

	public static send(proto:string,data:any){
		var cmd:number = Outgoing.session.getCmdByProto(proto);
		var cls:any = Outgoing.session.getClassByProto(proto);
		Outgoing.connection.send(cmd,cls,data);
	}

	public static back(cmd:number,data:any){
		var cls:any = Outgoing.session.getClassByCmd(cmd);
		var datas: any = cls.decode(data.bytes);
		var handler:Handler = Outgoing.session.getHandleByCmd(cmd);
		if(handler){
			handler.runWith(datas);
		}
	}
}