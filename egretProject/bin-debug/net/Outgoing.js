var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Outgoing = (function () {
    function Outgoing() {
    }
    Outgoing.init = function (obj) {
        Outgoing.session = new Session();
        Outgoing.session.init(obj);
        Outgoing.connection = new Connection();
    };
    Outgoing.send = function (proto, data) {
        var cmd = Outgoing.session.getCmdByProto(proto);
        var cls = Outgoing.session.getClassByProto(proto);
        Outgoing.connection.send(cmd, cls, data);
    };
    Outgoing.back = function (cmd, data) {
        var cls = Outgoing.session.getClassByCmd(cmd);
        var datas = cls.decode(data.bytes);
        var handler = Outgoing.session.getHandleByCmd(cmd);
        if (handler) {
            handler.runWith(datas);
        }
    };
    return Outgoing;
}());
__reflect(Outgoing.prototype, "Outgoing");
//# sourceMappingURL=Outgoing.js.map