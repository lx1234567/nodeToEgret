class Dispatcher 
{
	private static _dispatcher: egret.EventDispatcher = new egret.EventDispatcher();

	constructor() {

	}

    public static addEventListener(type: string,listener: Function,thisObject: any,useCapture:boolean = false, priority:number = 0): void 
    {
		Dispatcher._dispatcher.addEventListener(type, listener,thisObject, useCapture, priority);
	}

    public static removeEventListener(type: string,listener: Function,thisObject: any,useCapture:boolean = false): void 
    {
		Dispatcher._dispatcher.removeEventListener(type, listener, thisObject, useCapture);
	}

    public static dispatchEvent(type: string, data:any = null): void 
    {
		var event:egret.Event = Dispatcher.getEvent(type,data);
		Dispatcher._dispatcher.dispatchEvent(event);

		event.data = null;
		Dispatcher.eventPool.push(event);
	}

    public static hasListener(type: string): boolean 
    {
		return Dispatcher._dispatcher.hasEventListener(type);
	}

	public static getEvent(type:string,data:any = null):egret.Event{
		if(Dispatcher.eventPool.length > 0)
		{
			var event:egret.Event = Dispatcher.eventPool.pop();
			event.$type = type;
			event.data = data;
			return event;
		}
		else{
			return new egret.Event(type,false,false,data);
		}
	}

	public static eventPool:Array<egret.Event> = new Array<egret.Event>();
}