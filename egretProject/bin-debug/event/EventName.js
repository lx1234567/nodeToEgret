var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventName = (function () {
    function EventName() {
    }
    EventName.InitGame = "InitGame";
    EventName.MoveChess = "MoveChess";
    EventName.MoveChessSuc = "MoveChessSuc";
    return EventName;
}());
__reflect(EventName.prototype, "EventName");
//# sourceMappingURL=EventName.js.map