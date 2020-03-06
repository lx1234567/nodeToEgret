var ws = require('./myServer/MyWebSocket'),
ports = 8124;

var server = ws.createServer(function(conn){
    console.log("new connection")
    conn.on('text',function(str){
        boardcast(str)
    });
    conn.on('close',function(){
        console.log('connection close');
    });
    conn.on("error", function (err) {
        // 出错触发 //
        // console.log("header err")
        console.log(err)
    })
    function boardcast(str){
        server.connections.forEach(function(conn1){
            console.log(str);
            console.log(conn1.sendText);
            conn1.sendText(str);
        });
    }
}).listen(ports);