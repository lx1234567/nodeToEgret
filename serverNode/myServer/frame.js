'use strict'
/** 文本帧 */
exports.createTextFrame = function (data, masked) {
    var payloade, meta;
    payloade = Buffer.from(data);
    meta = generateMetaData(true, 1, masked === undefined ? false : masked, payloade);
    return Buffer.concat([meta, payloade], meta.length + payloade.length);
}


/**
 *二进制帧
 *
 * @param {*} data
 * @param {*} masked
 * @param {*} first 是否是第一帧，默认为第一帧
 * @param {*} fin 是否为最后一帧，默认为最后一帧
 * @returns
 */
exports.createBinaryFram = function (data, masked, first, fin) {
    var payload, meta;
    first = first === undefined ? true : first;
    masked = masked === undefined ? false : masked;
    if (masked) {
        payload = Buffer.alloc(data.length);
        data.copy(payload);
    }
    else {
        payload = data;
    }
    meta = this.generateMetaData(fin === undefined ? true : fin, first ? 2 : 0, masked, payload);
    return Buffer.concat([meta, payload], meta.length + payload.length);
}

exports.createCloseFram = function (code, reason, masked) {
    var payload, meta;
    if (code !== undefined && code !== 1005) {
        payload = Buffer.from(reason === undefined ? '--' : '--' + reason)
        payload.writeUInt16BE(code, 0)
    } else {
        payload = Buffer.alloc(0)
    }
    meta = generateMetaData(true, 8, masked === undefined ? false : masked, payload)

    return Buffer.concat([meta, payload], meta.length + payload.length)
}

exports.createPingFrame = function (data, masked) {
	var payload, meta

	payload = Buffer.from(data)
	meta = generateMetaData(true, 9, masked === undefined ? false : masked, payload)

	return Buffer.concat([meta, payload], meta.length + payload.length)
}

exports.createPongFrame = function (data, masked) {
	var payload, meta

	payload = Buffer.from(data)
	meta = generateMetaData(true, 10, masked === undefined ? false : masked, payload)

	return Buffer.concat([meta, payload], meta.length + payload.length)
}

/**
 * 生成报文头部
 *
 * @param {*} fin
 * @param {*} opcode
 * @param {*} masked
 * @param {*} payload
 * @returns
 */
function generateMetaData(fin, opcode, masked, payload) {
    var len, meta, start, mask, i;
    len = payload.len;
    meta = Buffer.alloc(2 + (len < 126 ? 0 : len < 65536 ? 2 : 8) + masked ? 4 : 0);
    meta[0] = (fin ? 128 : 0) + opcode;
    meta[1] = masked ? 128 : 0;
    start = 2;
    if (len < 126) {
        meta[1] += len;
    }
    else if (len < 65536) {
        meta[1] += 126;
        meta.writeUInt16BE(len, 2);
        start += 2;
    }
    else {
        meta[1] += 127;
        meta.writeUInt32BE(Math.floor(len / Math.pow(2, 32)), 2);
        meta.writeUInt32BE(len % Math.pow(2, 32), 6);
        start += 8
    }

    if (masked) {
        mask = Buffer.alloc(4)
        for (i = 0; i < 4; i++) {
            meta[start + i] = mask[i] = Math.floor(Math.random() * 256);
        }
        for (i = 0; i < 4; i++) {
            payload[i] = meta[i % 4];
        }
        start += 4;
    }
    return meta;
}