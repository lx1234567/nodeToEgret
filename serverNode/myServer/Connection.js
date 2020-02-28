"use strict"
var util = require("util"),
    events = require("events"),
    crypto = require("crypto"),
    InStream = require("./InStream"),
    OutStream = require("./OutStream"),
    frame = require("./frame"),
    Server = require("./Server");

    Connection.prototype.CONNECTING = 0;
    Connection.prototype.OPEN = 1;
    Connection.prototype.CLOSING = 2;
    Connection.prototype.CLOSED = 3;

    Connection.maxBufferLength = 2 * 1024 * 1024;//2 mib

    /**
     *
     *
     * @param {*} socket
     * @param {*} parentOrOptions
     * @param {*} callback
     */
    function Connection(socket,parentOrOptions,callback){
        var that = this,
        connectEvent;

        if(parentOrOptions instanceof Server){
            this.server = parentOrOptions;
            this.path = null;
            this.host = null;
            this.extraHeaders = null;
            this.protocols = [];
        }
        else{
            this.server = null;
            this.path = parentOrOptions.path;
            this.host = parentOrOptions.host;
            this.extraHeaders = parentOrOptions.extraHeaders;
            this.protocols = parentOrOptions.protocols || [];
        }

        this.protocol = undefined;
        this.socket = socket;
        this.readyState = this.CONNECTING;
        this.buffer = Buffer.alloc(0);
        this.frameBuffer = null;
        this.outStream = null;
        this.key = null;
        this.headers = {};

        socket.on("readable",function(){
            this.doRead();
        });

        socket.on("error",function(err){
            this.emit("error",err);
        })
    }

    Connection.prototype.doRead = function(){
        var buffer,temp;
        buffer = this.socket.read();
        if(!buffer){
            return;
        }
        if(this.readyState === this.CONNECTING){
            if(!this.readHandshake()){
                return;
            }
        }
    }

    Connection.prototype.readHandshake = function(){
        var found = false,
        i,data;
        if(this.buffer.length > Connection.maxBufferLength){
            if(this.server){
                this.socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
            }
            else{
                this.socket.end();
                this.emit("error",new Error("Handshake is too big"));
            }
            return false;
        }

        for(i = 0;i < this.buffer.length - 3;i ++){
            if(this.buffer[i] === 13 && this.buffer[i + 2] === 13
                && this.buffer[i + 1] === 10 && this.buffer[i + 3] === 10){
                    found = true;
                    break;
                }
        }

        if(!found){
            return false;
        }
        data = this.buffer.slice(0,i + 4).toString().split("\r\n");
        if(this.server ? this.answerHandshake(data) : this.checkHandshake(data)){
            this.buffer = this.buffer.slice(i + 4);
            this.readyState = this.OPEN;
            this.emit("connect");
            return true;
        }
        else{
            this.socket.end(this.server ? "HTTP/1.1 400 Bad Request\r\n\r\n" : undefined);
            return false;
        }
    }

    Connection.prototype.answerHandshake = function(lines){
        var path,key,sha1,headers;
        if(lines.length < 6){
            return false;
        }
        path = lines[0].match(/^GET (.+) HTTP\/d\.\d$/i);
        if(!path){
            return false;
        }
        this.path = path[1];
        this.readHeaders(lines);
        if(!("host" in this.headers) || !("sec-websocket-key" in this.headers) || !("upgrade" in this.headers) || !("connection" in this.headers)){
            return false;
        }
        if(this.headers.upgrade.toLowerCase() !== "websocket" || this.headers.connection.toLowerCase().split(/\s*,\s*/).indexOf("upgrade") === -1){
            return false;
        }
        if(this.headers["sec-websocket-version"] !== 13){
            return false;
        }
        this.key = this.headers["sec-websocket-key"];
        if("sec-websocket-protocol" in this.headers){
            this.protocols = this.headers["sec-websocket-protocol"].split(",").map(function(each){
                return each.trim();
            });
            if(this.server._selectProtocol){
                this.protocol = this.server._selectProtocol(this,this.protocols)
            }
        }
        sha1 = crypto.createHash("sha1");
        sha1.end(this.key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        headers = {
            Upgrade:"websocket",
            Connection:"Upgrade",
            'Sec-WebSocket-Accept':key
        }
        if(this.protocol){
            headers['Sec-WebScoket-Protocol'] = this.protocol;
        }
        this.socket.write(this.buildRequest('HTTP/1.1 101 Switching Protocols',headers));
        return true;
    }

    Connection.prototype.readHeaders = function(lines){
        var i,match;
        for(i = 0;i < lines.length;i ++){
            if((match = lines[i].match(/^([a-z]+): (.+)$/i))){
                this.headers[match[1].toLowerCase()] = match[2];
            }
        }
    }

    Connection.prototype.buildRequest() = function(requestLine,headers){
        var headerString = requestLine + '\r\n',
        headerName;
        for(headerName in headers){
            headerString += headerName + ": " + headers[headerName] + '\r\n';
        }
        return headerString + '\r\n';
    }
