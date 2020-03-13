var Session = require("./net/Session");
var ChessServer = require("./chess/ChessServer");
function Outgoing(){

}

var session = new Session();
exports.session = session;

exports.send = function(protoStr,data){
    var server = ChessServer.getServer();
    var cmd = session.getCmdByProto(protoStr);
    var data = data.serializeBinary();
    var tempCmd = Buffer.alloc(2);
    tempCmd.writeUInt16BE(cmd);
    var temp = Buffer.from(data);
    temp = Buffer.concat([tempCmd,temp], tempCmd.length + temp.length);
    server.connections.forEach(function(conn1){
        conn1.sendBinary(temp);
    });
}