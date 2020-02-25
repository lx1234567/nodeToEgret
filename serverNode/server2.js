var http = require("http");
var crypto = require("crypto");

var MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

var server = http.createServer(function (req, res) {
    res.end("websocket test\r\n")
});

server.on("upgrade", callback);
function callback(req, socket) {
    var resKey = crypto.createHash("sha1").update(req.headers["sec-websocket-key"] + MAGIC_STRING).digest("base64");
    var resHeaders = ([
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + resKey
    ]).concat("", "").join("\r\n");

    socket.on("data", function (data) {
        var fin, opcode, B, HB, mask, len, payload, start, i, hasMask

        if (data.length < 2) {
            return
        }

        // Is this the last frame in a sequence?
        B = data[0]
        HB = B >> 4
        if (HB % 8) {
            // RSV1, RSV2 and RSV3 must be clear
            return false
        }
        fin = HB === 8
        opcode = B % 16

        if (opcode !== 0 && opcode !== 1 && opcode !== 2 &&
            opcode !== 8 && opcode !== 9 && opcode !== 10) {
            // Invalid opcode
            return false
        }
        if (opcode >= 8 && !fin) {
            // Control frames must not be fragmented
            return false
        }

        B = data[1]
        hasMask = B >> 7
        len = B % 128
        start = hasMask ? 6 : 2

        if (data.length < start + len) {
            // Not enough data in the buffer
            return
        }

        // Get the actual payload length
        if (len === 126) {
            len = data.readUInt16BE(2)
            start += 2
        } else if (len === 127) {
            // Warning: JS can only store up to 2^53 in its number format
            len = data.readUInt32BE(2) * Math.pow(2, 32) + data.readUInt32BE(6)
            start += 8
        }
        if (data.length < start + len) {
            return
        }

        // Extract the payload
        payload = data.slice(start, start + len)
        if (hasMask) {
            // Decode with the given mask
            mask = data.slice(start - 4, start)
            for (i = 0; i < payload.length; i++) {
                payload[i] ^= mask[i % 4]
            }
        }
        data = data.slice(start + len)

        // Proceeds to frame processing
        // return this.processFrame(fin, opcode, payload)
        console.log(payload.toString());
    });

    socket.write(resHeaders);
}

server.listen(3000);