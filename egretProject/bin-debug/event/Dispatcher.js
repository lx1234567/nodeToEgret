var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dispatcher = (function () {
    function Dispatcher() {
    }
    Dispatcher.addEventListener = function (type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        Dispatcher._dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    Dispatcher.removeEventListener = function (type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        Dispatcher._dispatcher.removeEventListener(type, listener, thisObject, useCapture);
    };
    Dispatcher.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var event = Dispatcher.getEvent(type, data);
        Dispatcher._dispatcher.dispatchEvent(event);
        event.data = null;
        Dispatcher.eventPool.push(event);
    };
    Dispatcher.hasListener = function (type) {
        return Dispatcher._dispatcher.hasEventListener(type);
    };
    Dispatcher.getEvent = function (type, data) {
        if (data === void 0) { data = null; }
        if (Dispatcher.eventPool.length > 0) {
            var event = Dispatcher.eventPool.pop();
            event.$type = type;
            event.data = data;
            return event;
        }
        else {
            return new egret.Event(type, false, false, data);
        }
    };
    Dispatcher._dispatcher = new egret.EventDispatcher();
    Dispatcher.eventPool = new Array();
    return Dispatcher;
}());
__reflect(Dispatcher.prototype, "Dispatcher");
//# sourceMappingURL=Dispatcher.js.map