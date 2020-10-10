'use strict'
var util = require("util"),
    stream = require("stream");

function InStream(){
    stream.Readable.call(this);
}
module.exports = InStream;

util.inherits(InStream,stream.Readable);

InStream.prototype._read = function(){};

InStream.prototype.addData = function(data){
    this.push(data);
}

InStream.prototype.end = function(){
    this.push(null);
}