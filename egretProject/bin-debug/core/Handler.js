var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Handler = (function () {
    function Handler(thisObject, method, args, once) {
        if (thisObject === void 0) { thisObject = null; }
        if (method === void 0) { method = null; }
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        this.once = false;
        this._id = 0;
        this.setTo(thisObject, method, args, once);
    }
    Handler.prototype.setTo = function (thisObject, method, args, once) {
        if (thisObject === void 0) { thisObject = null; }
        if (method === void 0) { method = null; }
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        this._id = Handler._gid++;
        this.thisObject = thisObject;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    };
    Handler.prototype.run = function () {
        if (this.method == null)
            return null;
        var id = this._id;
        var result = this.method.apply(this.thisObject, this.args);
        this._id === id && this.once && this.recover();
        return result;
    };
    Handler.prototype.runWith = function (data) {
        if (this.method == null)
            return null;
        var id = this._id;
        if (data == null)
            var result = this.method.apply(this.thisObject, this.args);
        else if (!this.args && !data.unshift)
            result = this.method.call(this.thisObject, data);
        else if (this.args)
            result = this.method.apply(this.thisObject, this.args.concat(data));
        else
            result = this.method.apply(this.thisObject, data);
        this._id === id && this.once && this.recover();
        return result;
    };
    /**
     * 清理对象引用。
     */
    Handler.prototype.clear = function () {
        this.thisObject = null;
        this.method = null;
        this.args = null;
        return this;
    };
    /**
     * 清理并回收到 Handler 对象池内。
     */
    Handler.prototype.recover = function () {
        if (this._id > 0) {
            this._id = 0;
            Handler._pool.push(this.clear());
        }
    };
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
    Handler.create = function (thisObject, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = true; }
        if (Handler._pool.length)
            return Handler._pool.pop().setTo(thisObject, method, args, once);
        return new Handler(thisObject, method, args, once);
    };
    Handler._pool = [];
    Handler._gid = 1;
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
//# sourceMappingURL=Handler.js.map