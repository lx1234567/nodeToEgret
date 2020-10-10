var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseProxy = (function () {
    function BaseProxy() {
        this.addCmds();
    }
    BaseProxy.prototype.addCmds = function () {
    };
    BaseProxy.prototype.onProto = function (proto, fun, once) {
        if (once === void 0) { once = false; }
        var handle = Handler.create(this, fun, null, once);
        Outgoing.session.bind(proto, handle);
    };
    return BaseProxy;
}());
__reflect(BaseProxy.prototype, "BaseProxy");
//# sourceMappingURL=BaseProxy.js.map