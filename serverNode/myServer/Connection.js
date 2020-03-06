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
            that.doRead();
        });

        socket.on('error', function (err) {
            that.emit('error', err)
        })

        if(!this.server){
            connectEvent = socket.constructor.name === 'CleartextStream' ? 'secureConnect' : 'connect';
            socket.on(connectEvent,function(){
                that.startHandshake();
            })
        }

        var onclose = function(){
            if(this.readyState === that.CONNECTING || this.readyState === that.OPEN){
                that.emit('close',1006,'')
            }
            that.readyState = that.CLOSED;
            if(that.frameBuffer instanceof InStream){
                that.frameBuffer.end();
                that.frameBuffer = null;
            }
            if(that.frameBuffer instanceof OutStream){
                that.frameBuffer.end();
                that.frameBuffer = null;
            }
        }
        
        socket.once('close',onclose);
        socket.once('finish',onclose);
        events.EventEmitter.call(this);
        if(callback){
            this.once('connect',callback);
        }
    }

    util.inherits(Connection,events.EventEmitter);
    module.exports = Connection;

    Connection.binaryFragmentation = 512 * 1024;

    Connection.maxBufferLength = 2 * 1024 * 1024;

    Connection.prototype.doRead = function(){
        var buffer,temp;
        buffer = this.socket.read();
        if(!buffer){
            return;
        }
        this.buffer = Buffer.concat([this.buffer,buffer],this.buffer.length + buffer.length)
        if(this.readyState === this.CONNECTING){
            if(!this.readHandshake()){
                return;
            }
        }
        
        if(this.readyState !== this.CLOSED){
            while((temp = this.extractFrame()) === true){}
            if(temp === false){
                this.close(1002);
            }
            else if(this.buffer.length > Connection.maxBufferLength){
                this.close(1009);
            }
        }
    }

    Connection.prototype.extractFrame = function(){
        var fin,opcode,B,HB,mask,len,payload,start,i,hasMask;
        if(this.buffer.length < 2){
            return;
        }
        B = this.buffer[0];
        HB = B >> 4;
        if(HB % 8){
            return false; 
        }
        fin = HB === 8;
        opcode = B % 16;
        if(opcode !== 0 && opcode !== 1 && opcode !== 2 && opcode !== 8 && opcode !== 9 && opcode !== 10){
            return false;
        }
        if(opcode >= 8 && !fin){
            return false;
        }
        B = this.buffer[1];
        hasMask = B >> 7;
        if((this.server && !hasMask) || (!this.server && hasMask)){
            return false;
        }

        len = B % 128;
        start = hasMask ? 6 : 2;
        if(this.buffer.length < start + len){
            return;
        }

        if (len === 126) {
            len = this.buffer.readUInt16BE(2)
            start += 2
        } else if (len === 127) {
            len = this.buffer.readUInt32BE(2) * Math.pow(2, 32) + this.buffer.readUInt32BE(6)
            start += 8
        }
        if (this.buffer.length < start + len) {
            return
        }
    
        payload = this.buffer.slice(start, start + len)
        if (hasMask) {
            mask = this.buffer.slice(start - 4, start)
            for (i = 0; i < payload.length; i++) {
                payload[i] ^= mask[i % 4]
            }
        }
        this.buffer = this.buffer.slice(start + len);
        // console.log(this.buffer.length);
    
        return this.processFrame(fin, opcode, payload)
    }

    Connection.prototype.processFrame = function (fin, opcode, payload) {
        if (opcode === 8) {
            if (this.readyState === this.CLOSING) {
                this.socket.end()
            } else if (this.readyState === this.OPEN) {
                this.processCloseFrame(payload)
            }
            return true
        } else if (opcode === 9) {
            if (this.readyState === this.OPEN) {
                this.socket.write(frame.createPongFrame(payload.toString(), !this.server))
            }
            return true
        } else if (opcode === 10) {
            this.emit('pong', payload.toString())
            return true
        }
    
        if (this.readyState !== this.OPEN) {
            return true
        }
    
        if (opcode === 0 && this.frameBuffer === null) {
            return false
        } else if (opcode !== 0 && this.frameBuffer !== null) {
            return false
        }
    
        if (!opcode) {
            opcode = typeof this.frameBuffer === 'string' ? 1 : 2
        }
    
        if (opcode === 1) {
            payload = payload.toString()
            this.frameBuffer = this.frameBuffer ? this.frameBuffer + payload : payload
            if (fin) {
                this.emit('text', this.frameBuffer)
                this.frameBuffer = null
            }
        } else {
            if (!this.frameBuffer) {
                this.frameBuffer = new InStream
                this.emit('binary', this.frameBuffer)
            }
            this.frameBuffer.addData(payload)
    
            if (fin) {
                this.frameBuffer.end()
                this.frameBuffer = null
            }
        }
        return true
    }

    Connection.prototype.processCloseFrame = function (payload) {
        var code, reason
        if (payload.length >= 2) {
            code = payload.readUInt16BE(0)
            reason = payload.slice(2).toString()
        } else {
            code = 1005
            reason = ''
        }
        this.socket.write(frame.createCloseFrame(code, reason, !this.server))
        this.readyState = this.CLOSED
        this.emit('close', code, reason)
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
        path = lines[0].match(/^GET (.+) HTTP\/\d\.\d$/i);
        if(!path){
            return false;
        }
        this.readHeaders(lines);
        if(!("host" in this.headers) || !('sec-websocket-key' in this.headers) || !("upgrade" in this.headers) || !("connection" in this.headers)){
            return false;
        }
        
        if(this.headers.upgrade.toLowerCase() !== "websocket" || this.headers.connection.toLowerCase().split(/\s*,\s*/).indexOf("upgrade") === -1){
            return false;
        }
        if(this.headers["sec-websocket-version"] !== '13'){
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
        key = sha1.read().toString('base64');
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
            if((match = lines[i].match(/^([a-z-]+): (.+)$/i))){
                this.headers[match[1].toLowerCase()] = match[2];
            }
        }
    }

    Connection.prototype.buildRequest = function(requestLine,headers){
        var headerString = requestLine + '\r\n',
        headerName;
        for(headerName in headers){
            headerString += headerName + ": " + headers[headerName] + '\r\n';
        }
        return headerString + '\r\n';
    }

    Connection.prototype.checkHandshake = function(liens){
        var key,sha1,protocol;
        if(lines.length < 4){
            this.emit('error',new Error('Invalid handshak too short'));
            return false;
        }
        if(lines[0].match(/^HTTP\/\d\.\d 101( .*)?$/i)){
            this.emit('error',new Error('Invalid handshak: invalid first line format'));
            return false;
        }
        this.readHeaders(lines);
        if(!('upgrade' in this.headers) || !('sec-websocket-accept' in this.headers) || !('connection' in this.headers)){
            this.emit('error',new Error("Invalid errro: missing request head in lines"));
            return false;
        }

        if(this.headers.upgrade.toLowerCase() != 'websocket' || this.headers.connection.split(/\s*,\s*/).indexOf("upgrade") === -1){
            this.emit('error',new Error("Invalid error:not upgrade or connection head error"));
            return false;
        }

        key = this.headers['sec-websocket-accept'];
        protocol = this.headers['sec-websocket-protocol'];
        if(this.protocols && this.protocols.length){
            if(protocol || this.protocols.indexOf(protocol) === -1){
                this.emit('error',new Error('Invalid shake:no protocl was negotiated'));
                return;
            }
        }
        else{
            if(protocol){
                this.emit('error',new Error('Invalid shake:no protcol negotaited was expected'));
                return false;
            }
        }

        this.protocol = protocol;
        sha1 = crypto.createHash('sha1');
        sha1.end(this.key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        if(key !== sha1.read().toString('base64')){
            this.emit('error',new Error('Invalid shake:hash mismatch'));
            return false;
        }
        return true;
    }

    Connection.prototype.startHandshake = function(){
        var str,i,key,headers,header;
        key = Buffer.alloc(16);
        for(i = 0;i < 16;i ++){
            key[i] = Math.floor(Math.random() * 256);
        }
        this.key = key.toString('base64');
        headers = {
            Host:this.host,
            Upgrade:'websocket',
            Connection:'Upgrade',
            'Sec-WebSocket-Key':this.key,
            'Sec-WebSocket-Version':'13'
        }
        if(this.protocols && this.protocols.length){
            headers['Sec-WebSocket-Protocol'] = this.protocols.join(', ');
        }
        for(header in this.extraHeaders){
            headers[header] = this.extraHeaders[header];
        }
        str = this.buildRequest('GET ' + this.path + ' HTTP/1.1' + headers);
        this.socket.write(str)
    }

    Connection.prototype.send = function(data,callback){
        if(typeof data === 'string'){
            this.sendText(data,callback);
        }else if(Buffer.isBuffer(data)){
            this.sendBinary(data,callback);
        }
        else{
            throw new TypeError("data should be either a string or a Buffer instance");
        }
    }

    Connection.prototype.sendText = function(str,callback){
        if(this.readyState === this.OPEN){
            if(!this.outStream){
                return this.socket.write(frame.createTextFrame(str,!this.server),callback)
            }
            this.emit('error',new Error('You can\'t send text frame until you finish sending binary frame'))
        }
        else{
            this.emit('error',new Error('You can\'t wirte to a no-open connection'));
        }
    }

    Connection.prototype.sendBinary = function(data,callback){
        if(this.readyState === this.OPEN){
            if(!this.outStream){
                return this.socket.write(frame.createBinaryFram(data,!this.server,true,true),callback);
            }
            this.emit('error',new Error('You can\'t send more binary frame until you finish sending previous binary frame'))
        }
        else{
            this.emit('error',new Error('You can\'t wirte to a no-open connection'));
        }
    }

    Connection.prototype.beginBinary = function(){
        if(this.readyState === this.OPEN){
            if(!this.outStream){
                return (this.outStream = new OutStream(this,Connection.binaryFragmentation));
            }
            this.emit('error',new Error('You can\'t send more binary frame until you finish sending previous binary frame'))
        }
        else{
            this.emit('error',new Error('You can\'t wirte to a no-open connection'));
        }
    }

    Connection.prototype.sendPing = function(data){
        if(this.readyState === this.OPEN){
            this.socket.write(frame.createPingFrame(data || '',!this.server))
        }
        else{
            this.emit('error', new Error('You can\'t write to a non-open connection'))
        }
    }

    Connection.prototype.close = function(code,reason){
        if(this.readyState === this.OPEN){
            this.socket.write(frame.createCloseFram(code,reason,!this.server));
            this.readyState = this.CLOSING;
        }else if(this.readyState !== this.CLOSED){
            this.socket.end();
            this.readyState = this.CLOSED;
        }
        this.emit('close',code,reason);
    }
