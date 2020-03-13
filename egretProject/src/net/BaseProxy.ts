class BaseProxy {
	public constructor() {
		this.addCmds();
	}

	protected addCmds(){

	}

	protected onProto(proto:string,fun:Function,once:boolean = false){
		var handle:Handler = Handler.create(this,fun,null,once);
		Outgoing.session.bind(proto,handle);	
	}


}