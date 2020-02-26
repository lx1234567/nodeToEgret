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
function Server(secure,option,callback){
    var that = this;
    if(typeof option === "function"){
        callback = option;
        option = undefined;
    }

    var onConnection = function(socket){
        var conn = new Connection()
    }
}
    