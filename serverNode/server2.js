var http = require("http");
var crypto = require("crypto");

var MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

var server = http.createServer(function(req,res){
    res.end("websocket test\r\n")
});

server.on("upgrade",callback);
function callback(req,socket){
    var resKey = crypto.createHash("sha1").update(req.headers["sec-websocket-key"] + MAGIC_STRING).digest("base64");
    var resHeaders = ([
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + resKey
    ]).concat("","").join("\r\n");

    socket.on("data",function(data){
        console.log(data.toString());
    });

    socket.write(resHeaders);
}

server.listen(3000);