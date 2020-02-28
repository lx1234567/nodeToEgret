'use strict'
var util = require("util"),
    stream = require("stream"),
    frame = require("./frame");

function OutStream(connection,minSize){
    var that = this;
    this.connection = connection;
    this.minSize = minSize;
    this.buffer = Buffer.alloc(0);
    this.hasSent = false;
    stream.Writable.call(this);
    this.on("finish",function(){
        if(this.connection.readyState === that.connection.OPEN){
            that.connection.socket.write(frame.createBinaryFram(that.buffer,!that.connection.server,!that.hasSent,true));
        }
        that.connection.outStream = null;
    });
}
module.exports = OutStream;

util.inherits(OutStream,stream.Writable);

OutStream.prototype._wirte = function(chunk,encoding,callback){
    var frameBuffer;
    this.buffer = Buffer.concat([this.buffer,chunk],this.buffer.length + chunk.length);
    if(this.buffer.length >= this.minSize){
        if(this.connection.readyState === this.connection.OPEN){
            frameBuffer = frame.createBinaryFram(this.buffer,!this.connection.server,!this.hasSent,false);
            this.connection.socket.write(frameBuffer,encoding,callback);
        }
        this.buffer = Buffer.alloc(0);
        this.hasSent = true;
        if(this.connection.readyState !== this.connection.OPEN){
            callback();
        }
    }
    else{
        callback();
    }
}