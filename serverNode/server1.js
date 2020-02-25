var ws = require('nodejs-websocket');
var port = 8124;

var server = ws.createServer(function(conn){
    console.log("new connection");
    conn.on("text",function(str){
        console.log("received" + str);
        boardcast(str) // 广播消息 //
        conn.sendText(str) // 发送 数据 //
    })

    conn.on("close",function(code,reason){
        // 断开连接触发 //
        console.log("connection closed")
    })
    conn.on("error",function(err){
        // 出错触发 //
        console.log("header err")
        // console.log(err)
    })
    function boardcast(str){  // 广播 //
    // server.connections  保存每个连接进来的用户 //
    server.connections.forEach(function(conn){   //  .forEach 是调用数组里每个元素  //
    conn.sendText(str)
    })
    }
}).listen(port);
