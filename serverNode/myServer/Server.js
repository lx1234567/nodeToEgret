'use strict'
function nop(){};
var util = require("util"),
    net = require("net"),
    tls = require("tls"),
    events = require("events"),
    Connection;

/**
 * 
 * @param {*} secure 是否使用安全机制tls传输
 * @param {*} option 
 * @param {*} callback 
 */
function Server(secure,options,callback){
    var that = this;
    if(typeof options === "function"){
        callback = options;
        options = undefined;
    }

    var onConnection = function(socket){
        var conn = new Connection(socket,that,function(){
            that.connections.push(conn);
            conn.removeListener('error',nop);
            that.emit('connection',conn);
        });
        conn.on('close',function(){
            var pos = that.connections.indexOf(conn);
            if(pos !== -1){
                that.connections.splice(pos,1);
            }
        });
        conn.on('error',nop);
    }

    if(secure){
        this.socket = tls.createServer(options,onConnection);
    }
    else{
        this.socket = net.createServer(options,onConnection);
    }

    this.socket.on('close',function(){
        that.emit('close');
    });
    this.socket.on('error',function(err){
        that.emit('error',err);
    })

    this.connections = [];
    events.EventEmitter.call(this);
    if(callback){
        this.on('connection',callback);
    }
    this._selectProtocol = null;
    if(options && options.selectProtocol){
        this._selectProtocol = options.selectProtocol;
    }
    else if(options && options.validProtocols){
        this._selectProtocol = this._buildSelectProtocol(options.validprotocols);
    }
}

util.inherits(Server,events.EventEmitter);
module.exports = Server;

Connection = require("./Connection");

Server.prototype.listen = function(port,host,callback){
    var that = this;
    if(typeof host === 'function'){
        callback = host;
        host = undefined;
    }
    if(callback){
        this.on('listening',callback);
    }
    this.socket.listen(port,host,function(){
        that.emit('listening');
    })
    return this;
}

Server.prototype.close = function(callback){
    if(callback){
        this.once('close',callback);
    }
    this.socket.close();
}

Server.prototype._buildSelectProtocol = function(validProtocols){
    return function(conn,protocols){
        var i;
        for(i = 0;i < protocols.length;i ++){
            if(validprotocols.indexOf(protocols[i]) !== -1){
                return protocols[i];
            }
        }
    }
}
    