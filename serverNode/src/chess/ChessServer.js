
var ws = require("./../myServer/MyWebSocket"),
    playerInfo = require('./../protoJs/cs_chess_pb'),
    playerInfo1 = require('./../protoJs/p_chess_pb'),
    Outgoing = require("./../Outgoing"),
    GameCache = require("./../GameCache");
    ProtobufUtil = require("./../ProtobufUtil"),
    port = 8124;

var server = ws.createServer(function (conn) {
    conn.on('binary', function (msg) {
        console.log("收到客户段消息");
        var data = Buffer.alloc(0);
        msg.on('readable',function(){
            var tempData = msg.read();
            if(tempData){
                data = Buffer.concat([data,tempData],data.length+tempData.length);
            }
        })
        msg.on('end', function onBinaryEnd() {
            var cmd = data.readUInt16BE();
            var proto1 = Outgoing.session.getProtoByCmd(cmd);
            var funobj = Outgoing.session.bindNumFunObj[cmd]
            var classStr =  "proto." + proto1;
            var protoClass = ProtobufUtil.getProtoClassByString(classStr);
            var protoInfo = protoClass.deserializeBinary(data.slice(2));
            if(funobj){
                var fun = funobj["fun"];
                var obj = funobj["callObj"];
                fun.call(obj,protoInfo,conn);
            }
        })
    })

    conn.on('error',function(data){
        GameCache.chessCache.removerPlayer(conn["playerId"]);
        console.log("客户端掉线  " + data);
    })
}).listen(port);

exports.getServer = function(){
    return server;
}

