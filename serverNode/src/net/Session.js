var fs = require('fs');

function Session(){
    var that = this;
    this.bindNumProto = {};
    this.bindProtoNum = {};
    this.bindNumFunObj = {};
    fs.readFile("./../msg2id.json",function(err,data){
        var msg2id = data.toString();
        msg2id = JSON.parse(msg2id);
        for(var key in msg2id){
            that.bindNumProto[msg2id[key]] = key;
            that.bindProtoNum[key] = msg2id[key];
        }
        GameProxy = require("./../GameProxy");
    });
}

Session.prototype.getCmdByProto = function(proto){
    return this.bindProtoNum[proto];
}

Session.prototype.getProtoByCmd = function(cmd){
    return this.bindNumProto[cmd];
}

Session.prototype.bind = function(proto,funObj){
    this.bindNumFunObj[this.bindProtoNum[proto]] = funObj;
}

module.exports = Session;