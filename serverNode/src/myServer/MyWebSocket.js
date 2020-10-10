var Server = require("./Server"),
    Connection = require("./Connection"),
    net = require("net"),
    tls = require('tls'),
    net = require('net'),
    url = require('url');

exports.createServer = function (options, callback) {
    if (typeof options === 'function' || !arguments.length) {
        return new Server(false, options);
    }
    return Server(Boolean(options.secure), options, callback);
}

exports.connect = function (URL, options, callback) {
    var socket;
    if (options === 'function') {
        callback = options;
        options = undefined;
    }
    options = options || {};
    var connectionOptions = parseWSURL(URL);
    options.port = connectionOptions.port;
    options.host = connectionOptions.host;

    connectionOptions.extraHeaders = options.extraHeaders;
    connectionOptions.protocols = options.protocols;

    if(connectionOptions.secure){
        socket = tls.connect(options);
    }
    else{
        socket = net.connect(options);
    }

    return Connection(socket,connectionOptions,callback);
}

exports.setBinaryFragmentation = function(bytes){
    Connection.binaryFragmentation = bytes;
}

exports.setMaxBufferLength = function(bytes){
    Connection.maxBufferLength = bytes;
}

function parseWSURL(URL) {
    var parts, secure;
    parts = url.parse(URL);
    parts.protocol = parts.protocol || 'ws:';
    if (parts.protocol === 'ws:') {
        secure = false;
    }
    else if (parts.protocol === 'wss:') {
        secure = true;
    }
    else {
        throw new Error('Invalid protocol ' + parts.protocol + '. It must be ws or wss');
    }
    parts.port = parts.port || (secure ? 443 : 80);
    parts.path = parts.path || '/';
    return {
        path: parts.path,
        port: parts.port,
        secure: secure,
        host: parts.hostname
    }
}