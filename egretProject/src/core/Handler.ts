class Handler
{
    static _pool:any[] = [];

    static _gid:number = 1;

    public thisObject:any;

    public method:Function;

    public args:any[];

    public once:boolean = false;

    protected _id:number = 0;

    constructor(thisObject:any = null,method:Function = null,args:any[] = null, once:boolean = false)
    {
        this.setTo(thisObject,method,args,once);
    }

    public setTo(thisObject:any = null,method:Function = null,args:any[] = null, once:boolean = false):Handler{
        this._id = Handler._gid++;
        this.thisObject = thisObject;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    }

    public run():any{
       if (this.method == null) return null;
        var id:number = this._id;
        var result:any = this.method.apply(this.thisObject, this.args);
        this._id === id && this.once && this.recover();
        return result;
    }

    public runWith(data:any):any{
        if (this.method == null) return null;
        var id:number = this._id;
        if (data == null)
            var result:any = this.method.apply(this.thisObject, this.args);
        // /*[IF-FLASH]*/
        // else if (!this.args && !(data instanceof Array)) result = this.method.call(this.thisObject, data);
        else if (!this.args && !data.unshift) result= this.method.call(this.thisObject, data);
        else if (this.args) result = this.method.apply(this.thisObject, this.args.concat(data));
        else result = this.method.apply(this.thisObject, data);
        this._id === id && this.once && this.recover();
        return result;
    }

    /**
     * 清理对象引用。
     */
    public clear():Handler {
        this.thisObject = null;
        this.method = null;
        this.args = null;
        return this;
    }
    
    /**
     * 清理并回收到 Handler 对象池内。
     */
    public recover():void {
        if (this._id > 0) {
            this._id = 0;
            Handler._pool.push(this.clear());
        }
    }
    
    // public equal(thisObject:any = null,method:Function = null,args:any[] = null):boolean
    // {
    //     // return this.method == method && this.thisObject == thisObject && App.ArrayUtils.equal(args,this.args);
    // }

    /**
     * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
     * @param	caller 执行域(this)。
     * @param	method 回调方法。
     * @param	args 携带的参数。
     * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
     * @return  返回创建的handler实例。
     */
    public static create(thisObject:any, method:Function, args:any[] = null, once:boolean = true):Handler {
        if (Handler._pool.length) return Handler._pool.pop().setTo(thisObject, method, args, once);
        return new Handler(thisObject, method, args, once);
    }
}