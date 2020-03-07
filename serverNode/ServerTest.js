var ws = require('./myServer/MyWebSocket'),
prtobufJs = require("protobufjs"),
root = prtobufJs.loadSync("./protobuf/test.proto"),
student = root.lookupType("prt.Student");
ports = 8124;

var server = ws.createServer(function(conn){
    console.log("new connection")
    conn.on('text',function(str){
        boardcast(str)
    });
    conn.on('binary',function(st1){
        boardcast(st1)
    })
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
            var student1 = student.create();
            student1.name = "张三";
            student1.id = 5;
            var studentbuf = student.encode(student1).finish();
            conn1.sendBinary(studentbuf);
        });
    }
}).listen(ports);