var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Session = (function () {
    function Session() {
    }
    Session.prototype.init = function (obj) {
        this._bindProtoClass = {};
        this._bindProtoNum = {};
        this._bindNumProto = {};
        for (var key in obj) {
            var classString = key;
            var cmd = obj[key];
            this._bindNumProto[cmd] = classString;
            this._bindProtoNum[classString] = cmd;
            var classType = egret.getDefinitionByName(classString);
            this._bindProtoClass[classString] = classType;
        }
    };
    Session.prototype.getCmdByProto = function (proto) {
        return this._bindProtoNum[proto];
    };
    Session.prototype.getClassByProto = function (proto) {
        return this._bindProtoClass[proto];
    };
    Session.prototype.getClassByCmd = function (cmd) {
        return this._bindProtoClass[this._bindNumProto[cmd]];
    };
    Session.prototype.bind = function (proto, handle) {
        if (!this._bindNumHandle) {
            this._bindNumHandle = {};
        }
        this._bindNumHandle[this._bindProtoNum[proto]] = handle;
    };
    Session.prototype.getHandleByCmd = function (cmd) {
        return this._bindNumHandle[cmd];
    };
    return Session;
}());
__reflect(Session.prototype, "Session");
//# sourceMappingURL=Session.js.map