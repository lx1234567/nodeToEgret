'use strict'

exports.createTextFrame = function(data,masked){
    var payloade,meta;
    payloade = Buffer.from(data);
    meta = generateMetaData(true,1,masked === undefined ? false : masked,payloade);
    return Buffer.concat([meta,payloade],meta.length + payloade.length);
}

function generateMetaData(fin,opcode,masked,payload){
    var len,meta,start,mask,i;
    len = payload.len;
    meta = Buffer.alloc(2 + (len < 126 ? 0 : len < 65536 ? 2 : 8) + masked ? 4 : 0);
    meta[0] = (fin ? 128 : 0) + opcode;
    meta[1] = masked ? 128 : 0;
    start = 2;
    if(len < 126){
        meta[1] += len;
    }
    else if(len < 65536){
        meta[1] += 126;
        meta.writeUInt16BE(len,2);
        start += 2;
    }
    else{
        meta[1] += 127;
        meta.writeUInt32BE(Math.floor(len / Math.pow(2,32)),2);
        meta.writeUInt32BE(len % Math.pow(2,32),6);
        start += 8
    }

    if(masked){
        mask = Buffer.alloc(4)
        for(i = 0;i < 4;i ++){
            meta[start + i] = mask[i] = Math.floor(Math.random() * 256);
        }
        for(i = 0; i < 4;i ++){
            payload[i] = meta[i % 4];
        }
        start += 4;
    }
    return meta;
}