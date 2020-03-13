var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.msg = (function() {

    /**
     * Namespace msg.
     * @exports msg
     * @namespace
     */
    var msg = {};

    msg.S2CInitGame = (function() {

        /**
         * Properties of a S2CInitGame.
         * @memberof msg
         * @interface IS2CInitGame
         * @property {msg.ISChessInitInfo} player1 S2CInitGame player1
         * @property {msg.ISChessInitInfo} player2 S2CInitGame player2
         */

        /**
         * Constructs a new S2CInitGame.
         * @memberof msg
         * @classdesc Represents a S2CInitGame.
         * @implements IS2CInitGame
         * @constructor
         * @param {msg.IS2CInitGame=} [properties] Properties to set
         */
        function S2CInitGame(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2CInitGame player1.
         * @member {msg.ISChessInitInfo} player1
         * @memberof msg.S2CInitGame
         * @instance
         */
        S2CInitGame.prototype.player1 = null;

        /**
         * S2CInitGame player2.
         * @member {msg.ISChessInitInfo} player2
         * @memberof msg.S2CInitGame
         * @instance
         */
        S2CInitGame.prototype.player2 = null;

        /**
         * Creates a new S2CInitGame instance using the specified properties.
         * @function create
         * @memberof msg.S2CInitGame
         * @static
         * @param {msg.IS2CInitGame=} [properties] Properties to set
         * @returns {msg.S2CInitGame} S2CInitGame instance
         */
        S2CInitGame.create = function create(properties) {
            return new S2CInitGame(properties);
        };

        /**
         * Encodes the specified S2CInitGame message. Does not implicitly {@link msg.S2CInitGame.verify|verify} messages.
         * @function encode
         * @memberof msg.S2CInitGame
         * @static
         * @param {msg.IS2CInitGame} message S2CInitGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CInitGame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.msg.SChessInitInfo.encode(message.player1, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            $root.msg.SChessInitInfo.encode(message.player2, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CInitGame message, length delimited. Does not implicitly {@link msg.S2CInitGame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.S2CInitGame
         * @static
         * @param {msg.IS2CInitGame} message S2CInitGame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CInitGame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CInitGame message from the specified reader or buffer.
         * @function decode
         * @memberof msg.S2CInitGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.S2CInitGame} S2CInitGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CInitGame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.S2CInitGame();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.player1 = $root.msg.SChessInitInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.player2 = $root.msg.SChessInitInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("player1"))
                throw $util.ProtocolError("missing required 'player1'", { instance: message });
            if (!message.hasOwnProperty("player2"))
                throw $util.ProtocolError("missing required 'player2'", { instance: message });
            return message;
        };

        /**
         * Decodes a S2CInitGame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.S2CInitGame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.S2CInitGame} S2CInitGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CInitGame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CInitGame message.
         * @function verify
         * @memberof msg.S2CInitGame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CInitGame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.msg.SChessInitInfo.verify(message.player1);
                if (error)
                    return "player1." + error;
            }
            {
                var error = $root.msg.SChessInitInfo.verify(message.player2);
                if (error)
                    return "player2." + error;
            }
            return null;
        };

        return S2CInitGame;
    })();

    msg.S2CPlayInitInfo = (function() {

        /**
         * Properties of a S2CPlayInitInfo.
         * @memberof msg
         * @interface IS2CPlayInitInfo
         * @property {msg.ISPlayerInfo} playerInfo S2CPlayInitInfo playerInfo
         */

        /**
         * Constructs a new S2CPlayInitInfo.
         * @memberof msg
         * @classdesc Represents a S2CPlayInitInfo.
         * @implements IS2CPlayInitInfo
         * @constructor
         * @param {msg.IS2CPlayInitInfo=} [properties] Properties to set
         */
        function S2CPlayInitInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2CPlayInitInfo playerInfo.
         * @member {msg.ISPlayerInfo} playerInfo
         * @memberof msg.S2CPlayInitInfo
         * @instance
         */
        S2CPlayInitInfo.prototype.playerInfo = null;

        /**
         * Creates a new S2CPlayInitInfo instance using the specified properties.
         * @function create
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {msg.IS2CPlayInitInfo=} [properties] Properties to set
         * @returns {msg.S2CPlayInitInfo} S2CPlayInitInfo instance
         */
        S2CPlayInitInfo.create = function create(properties) {
            return new S2CPlayInitInfo(properties);
        };

        /**
         * Encodes the specified S2CPlayInitInfo message. Does not implicitly {@link msg.S2CPlayInitInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {msg.IS2CPlayInitInfo} message S2CPlayInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayInitInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.msg.SPlayerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayInitInfo message, length delimited. Does not implicitly {@link msg.S2CPlayInitInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {msg.IS2CPlayInitInfo} message S2CPlayInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayInitInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayInitInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.S2CPlayInitInfo} S2CPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayInitInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.S2CPlayInitInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerInfo = $root.msg.SPlayerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("playerInfo"))
                throw $util.ProtocolError("missing required 'playerInfo'", { instance: message });
            return message;
        };

        /**
         * Decodes a S2CPlayInitInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.S2CPlayInitInfo} S2CPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayInitInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayInitInfo message.
         * @function verify
         * @memberof msg.S2CPlayInitInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayInitInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.msg.SPlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        return S2CPlayInitInfo;
    })();

    msg.S2CPlayMoveChess = (function() {

        /**
         * Properties of a S2CPlayMoveChess.
         * @memberof msg
         * @interface IS2CPlayMoveChess
         * @property {msg.ISChessMoveInfo} info S2CPlayMoveChess info
         */

        /**
         * Constructs a new S2CPlayMoveChess.
         * @memberof msg
         * @classdesc Represents a S2CPlayMoveChess.
         * @implements IS2CPlayMoveChess
         * @constructor
         * @param {msg.IS2CPlayMoveChess=} [properties] Properties to set
         */
        function S2CPlayMoveChess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2CPlayMoveChess info.
         * @member {msg.ISChessMoveInfo} info
         * @memberof msg.S2CPlayMoveChess
         * @instance
         */
        S2CPlayMoveChess.prototype.info = null;

        /**
         * Creates a new S2CPlayMoveChess instance using the specified properties.
         * @function create
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {msg.IS2CPlayMoveChess=} [properties] Properties to set
         * @returns {msg.S2CPlayMoveChess} S2CPlayMoveChess instance
         */
        S2CPlayMoveChess.create = function create(properties) {
            return new S2CPlayMoveChess(properties);
        };

        /**
         * Encodes the specified S2CPlayMoveChess message. Does not implicitly {@link msg.S2CPlayMoveChess.verify|verify} messages.
         * @function encode
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {msg.IS2CPlayMoveChess} message S2CPlayMoveChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayMoveChess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.msg.SChessMoveInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayMoveChess message, length delimited. Does not implicitly {@link msg.S2CPlayMoveChess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {msg.IS2CPlayMoveChess} message S2CPlayMoveChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayMoveChess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayMoveChess message from the specified reader or buffer.
         * @function decode
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.S2CPlayMoveChess} S2CPlayMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayMoveChess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.S2CPlayMoveChess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.info = $root.msg.SChessMoveInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("info"))
                throw $util.ProtocolError("missing required 'info'", { instance: message });
            return message;
        };

        /**
         * Decodes a S2CPlayMoveChess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.S2CPlayMoveChess} S2CPlayMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayMoveChess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayMoveChess message.
         * @function verify
         * @memberof msg.S2CPlayMoveChess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayMoveChess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.msg.SChessMoveInfo.verify(message.info);
                if (error)
                    return "info." + error;
            }
            return null;
        };

        return S2CPlayMoveChess;
    })();

    msg.C2SMoveChess = (function() {

        /**
         * Properties of a C2SMoveChess.
         * @memberof msg
         * @interface IC2SMoveChess
         * @property {msg.ISChessMoveInfo} info C2SMoveChess info
         */

        /**
         * Constructs a new C2SMoveChess.
         * @memberof msg
         * @classdesc Represents a C2SMoveChess.
         * @implements IC2SMoveChess
         * @constructor
         * @param {msg.IC2SMoveChess=} [properties] Properties to set
         */
        function C2SMoveChess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2SMoveChess info.
         * @member {msg.ISChessMoveInfo} info
         * @memberof msg.C2SMoveChess
         * @instance
         */
        C2SMoveChess.prototype.info = null;

        /**
         * Creates a new C2SMoveChess instance using the specified properties.
         * @function create
         * @memberof msg.C2SMoveChess
         * @static
         * @param {msg.IC2SMoveChess=} [properties] Properties to set
         * @returns {msg.C2SMoveChess} C2SMoveChess instance
         */
        C2SMoveChess.create = function create(properties) {
            return new C2SMoveChess(properties);
        };

        /**
         * Encodes the specified C2SMoveChess message. Does not implicitly {@link msg.C2SMoveChess.verify|verify} messages.
         * @function encode
         * @memberof msg.C2SMoveChess
         * @static
         * @param {msg.IC2SMoveChess} message C2SMoveChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMoveChess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.msg.SChessMoveInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified C2SMoveChess message, length delimited. Does not implicitly {@link msg.C2SMoveChess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.C2SMoveChess
         * @static
         * @param {msg.IC2SMoveChess} message C2SMoveChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMoveChess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMoveChess message from the specified reader or buffer.
         * @function decode
         * @memberof msg.C2SMoveChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.C2SMoveChess} C2SMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMoveChess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.C2SMoveChess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.info = $root.msg.SChessMoveInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("info"))
                throw $util.ProtocolError("missing required 'info'", { instance: message });
            return message;
        };

        /**
         * Decodes a C2SMoveChess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.C2SMoveChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.C2SMoveChess} C2SMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMoveChess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMoveChess message.
         * @function verify
         * @memberof msg.C2SMoveChess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMoveChess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.msg.SChessMoveInfo.verify(message.info);
                if (error)
                    return "info." + error;
            }
            return null;
        };

        return C2SMoveChess;
    })();

    msg.C2SPlayInitInfo = (function() {

        /**
         * Properties of a C2SPlayInitInfo.
         * @memberof msg
         * @interface IC2SPlayInitInfo
         * @property {msg.ISPlayerInfo} playerInfo C2SPlayInitInfo playerInfo
         */

        /**
         * Constructs a new C2SPlayInitInfo.
         * @memberof msg
         * @classdesc Represents a C2SPlayInitInfo.
         * @implements IC2SPlayInitInfo
         * @constructor
         * @param {msg.IC2SPlayInitInfo=} [properties] Properties to set
         */
        function C2SPlayInitInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2SPlayInitInfo playerInfo.
         * @member {msg.ISPlayerInfo} playerInfo
         * @memberof msg.C2SPlayInitInfo
         * @instance
         */
        C2SPlayInitInfo.prototype.playerInfo = null;

        /**
         * Creates a new C2SPlayInitInfo instance using the specified properties.
         * @function create
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {msg.IC2SPlayInitInfo=} [properties] Properties to set
         * @returns {msg.C2SPlayInitInfo} C2SPlayInitInfo instance
         */
        C2SPlayInitInfo.create = function create(properties) {
            return new C2SPlayInitInfo(properties);
        };

        /**
         * Encodes the specified C2SPlayInitInfo message. Does not implicitly {@link msg.C2SPlayInitInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {msg.IC2SPlayInitInfo} message C2SPlayInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayInitInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.msg.SPlayerInfo.encode(message.playerInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified C2SPlayInitInfo message, length delimited. Does not implicitly {@link msg.C2SPlayInitInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {msg.IC2SPlayInitInfo} message C2SPlayInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayInitInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SPlayInitInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.C2SPlayInitInfo} C2SPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayInitInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.C2SPlayInitInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerInfo = $root.msg.SPlayerInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("playerInfo"))
                throw $util.ProtocolError("missing required 'playerInfo'", { instance: message });
            return message;
        };

        /**
         * Decodes a C2SPlayInitInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.C2SPlayInitInfo} C2SPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayInitInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SPlayInitInfo message.
         * @function verify
         * @memberof msg.C2SPlayInitInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SPlayInitInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.msg.SPlayerInfo.verify(message.playerInfo);
                if (error)
                    return "playerInfo." + error;
            }
            return null;
        };

        return C2SPlayInitInfo;
    })();

    msg.SPlayerInfo = (function() {

        /**
         * Properties of a SPlayerInfo.
         * @memberof msg
         * @interface ISPlayerInfo
         * @property {string} playerName SPlayerInfo playerName
         * @property {number} playerId SPlayerInfo playerId
         */

        /**
         * Constructs a new SPlayerInfo.
         * @memberof msg
         * @classdesc Represents a SPlayerInfo.
         * @implements ISPlayerInfo
         * @constructor
         * @param {msg.ISPlayerInfo=} [properties] Properties to set
         */
        function SPlayerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SPlayerInfo playerName.
         * @member {string} playerName
         * @memberof msg.SPlayerInfo
         * @instance
         */
        SPlayerInfo.prototype.playerName = "";

        /**
         * SPlayerInfo playerId.
         * @member {number} playerId
         * @memberof msg.SPlayerInfo
         * @instance
         */
        SPlayerInfo.prototype.playerId = 0;

        /**
         * Creates a new SPlayerInfo instance using the specified properties.
         * @function create
         * @memberof msg.SPlayerInfo
         * @static
         * @param {msg.ISPlayerInfo=} [properties] Properties to set
         * @returns {msg.SPlayerInfo} SPlayerInfo instance
         */
        SPlayerInfo.create = function create(properties) {
            return new SPlayerInfo(properties);
        };

        /**
         * Encodes the specified SPlayerInfo message. Does not implicitly {@link msg.SPlayerInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.SPlayerInfo
         * @static
         * @param {msg.ISPlayerInfo} message SPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SPlayerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerName);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified SPlayerInfo message, length delimited. Does not implicitly {@link msg.SPlayerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SPlayerInfo
         * @static
         * @param {msg.ISPlayerInfo} message SPlayerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SPlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SPlayerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SPlayerInfo} SPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SPlayerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SPlayerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerName = reader.string();
                    break;
                case 2:
                    message.playerId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("playerName"))
                throw $util.ProtocolError("missing required 'playerName'", { instance: message });
            if (!message.hasOwnProperty("playerId"))
                throw $util.ProtocolError("missing required 'playerId'", { instance: message });
            return message;
        };

        /**
         * Decodes a SPlayerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SPlayerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SPlayerInfo} SPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SPlayerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SPlayerInfo message.
         * @function verify
         * @memberof msg.SPlayerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SPlayerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.playerName))
                return "playerName: string expected";
            if (!$util.isInteger(message.playerId))
                return "playerId: integer expected";
            return null;
        };

        return SPlayerInfo;
    })();

    msg.SChessInitInfo = (function() {

        /**
         * Properties of a SChessInitInfo.
         * @memberof msg
         * @interface ISChessInitInfo
         * @property {number} playerId SChessInitInfo playerId
         * @property {number} colorIndex SChessInitInfo colorIndex
         * @property {number} posIndex SChessInitInfo posIndex
         */

        /**
         * Constructs a new SChessInitInfo.
         * @memberof msg
         * @classdesc Represents a SChessInitInfo.
         * @implements ISChessInitInfo
         * @constructor
         * @param {msg.ISChessInitInfo=} [properties] Properties to set
         */
        function SChessInitInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SChessInitInfo playerId.
         * @member {number} playerId
         * @memberof msg.SChessInitInfo
         * @instance
         */
        SChessInitInfo.prototype.playerId = 0;

        /**
         * SChessInitInfo colorIndex.
         * @member {number} colorIndex
         * @memberof msg.SChessInitInfo
         * @instance
         */
        SChessInitInfo.prototype.colorIndex = 0;

        /**
         * SChessInitInfo posIndex.
         * @member {number} posIndex
         * @memberof msg.SChessInitInfo
         * @instance
         */
        SChessInitInfo.prototype.posIndex = 0;

        /**
         * Creates a new SChessInitInfo instance using the specified properties.
         * @function create
         * @memberof msg.SChessInitInfo
         * @static
         * @param {msg.ISChessInitInfo=} [properties] Properties to set
         * @returns {msg.SChessInitInfo} SChessInitInfo instance
         */
        SChessInitInfo.create = function create(properties) {
            return new SChessInitInfo(properties);
        };

        /**
         * Encodes the specified SChessInitInfo message. Does not implicitly {@link msg.SChessInitInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.SChessInitInfo
         * @static
         * @param {msg.ISChessInitInfo} message SChessInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessInitInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerId);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.colorIndex);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.posIndex);
            return writer;
        };

        /**
         * Encodes the specified SChessInitInfo message, length delimited. Does not implicitly {@link msg.SChessInitInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SChessInitInfo
         * @static
         * @param {msg.ISChessInitInfo} message SChessInitInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessInitInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SChessInitInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SChessInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SChessInitInfo} SChessInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessInitInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SChessInitInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.int32();
                    break;
                case 2:
                    message.colorIndex = reader.int32();
                    break;
                case 3:
                    message.posIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("playerId"))
                throw $util.ProtocolError("missing required 'playerId'", { instance: message });
            if (!message.hasOwnProperty("colorIndex"))
                throw $util.ProtocolError("missing required 'colorIndex'", { instance: message });
            if (!message.hasOwnProperty("posIndex"))
                throw $util.ProtocolError("missing required 'posIndex'", { instance: message });
            return message;
        };

        /**
         * Decodes a SChessInitInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SChessInitInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SChessInitInfo} SChessInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessInitInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SChessInitInfo message.
         * @function verify
         * @memberof msg.SChessInitInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SChessInitInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.playerId))
                return "playerId: integer expected";
            if (!$util.isInteger(message.colorIndex))
                return "colorIndex: integer expected";
            if (!$util.isInteger(message.posIndex))
                return "posIndex: integer expected";
            return null;
        };

        return SChessInitInfo;
    })();

    msg.SChessMoveInfo = (function() {

        /**
         * Properties of a SChessMoveInfo.
         * @memberof msg
         * @interface ISChessMoveInfo
         * @property {number} playerId SChessMoveInfo playerId
         * @property {msg.ISChessPos} chessPos SChessMoveInfo chessPos
         * @property {msg.ISChessPos} movePos SChessMoveInfo movePos
         */

        /**
         * Constructs a new SChessMoveInfo.
         * @memberof msg
         * @classdesc Represents a SChessMoveInfo.
         * @implements ISChessMoveInfo
         * @constructor
         * @param {msg.ISChessMoveInfo=} [properties] Properties to set
         */
        function SChessMoveInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SChessMoveInfo playerId.
         * @member {number} playerId
         * @memberof msg.SChessMoveInfo
         * @instance
         */
        SChessMoveInfo.prototype.playerId = 0;

        /**
         * SChessMoveInfo chessPos.
         * @member {msg.ISChessPos} chessPos
         * @memberof msg.SChessMoveInfo
         * @instance
         */
        SChessMoveInfo.prototype.chessPos = null;

        /**
         * SChessMoveInfo movePos.
         * @member {msg.ISChessPos} movePos
         * @memberof msg.SChessMoveInfo
         * @instance
         */
        SChessMoveInfo.prototype.movePos = null;

        /**
         * Creates a new SChessMoveInfo instance using the specified properties.
         * @function create
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {msg.ISChessMoveInfo=} [properties] Properties to set
         * @returns {msg.SChessMoveInfo} SChessMoveInfo instance
         */
        SChessMoveInfo.create = function create(properties) {
            return new SChessMoveInfo(properties);
        };

        /**
         * Encodes the specified SChessMoveInfo message. Does not implicitly {@link msg.SChessMoveInfo.verify|verify} messages.
         * @function encode
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {msg.ISChessMoveInfo} message SChessMoveInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessMoveInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerId);
            $root.msg.SChessPos.encode(message.chessPos, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            $root.msg.SChessPos.encode(message.movePos, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SChessMoveInfo message, length delimited. Does not implicitly {@link msg.SChessMoveInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {msg.ISChessMoveInfo} message SChessMoveInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessMoveInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SChessMoveInfo message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SChessMoveInfo} SChessMoveInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessMoveInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SChessMoveInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.int32();
                    break;
                case 2:
                    message.chessPos = $root.msg.SChessPos.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.movePos = $root.msg.SChessPos.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("playerId"))
                throw $util.ProtocolError("missing required 'playerId'", { instance: message });
            if (!message.hasOwnProperty("chessPos"))
                throw $util.ProtocolError("missing required 'chessPos'", { instance: message });
            if (!message.hasOwnProperty("movePos"))
                throw $util.ProtocolError("missing required 'movePos'", { instance: message });
            return message;
        };

        /**
         * Decodes a SChessMoveInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SChessMoveInfo} SChessMoveInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessMoveInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SChessMoveInfo message.
         * @function verify
         * @memberof msg.SChessMoveInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SChessMoveInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.playerId))
                return "playerId: integer expected";
            {
                var error = $root.msg.SChessPos.verify(message.chessPos);
                if (error)
                    return "chessPos." + error;
            }
            {
                var error = $root.msg.SChessPos.verify(message.movePos);
                if (error)
                    return "movePos." + error;
            }
            return null;
        };

        return SChessMoveInfo;
    })();

    msg.SChessPos = (function() {

        /**
         * Properties of a SChessPos.
         * @memberof msg
         * @interface ISChessPos
         * @property {number} x SChessPos x
         * @property {number} y SChessPos y
         */

        /**
         * Constructs a new SChessPos.
         * @memberof msg
         * @classdesc Represents a SChessPos.
         * @implements ISChessPos
         * @constructor
         * @param {msg.ISChessPos=} [properties] Properties to set
         */
        function SChessPos(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SChessPos x.
         * @member {number} x
         * @memberof msg.SChessPos
         * @instance
         */
        SChessPos.prototype.x = 0;

        /**
         * SChessPos y.
         * @member {number} y
         * @memberof msg.SChessPos
         * @instance
         */
        SChessPos.prototype.y = 0;

        /**
         * Creates a new SChessPos instance using the specified properties.
         * @function create
         * @memberof msg.SChessPos
         * @static
         * @param {msg.ISChessPos=} [properties] Properties to set
         * @returns {msg.SChessPos} SChessPos instance
         */
        SChessPos.create = function create(properties) {
            return new SChessPos(properties);
        };

        /**
         * Encodes the specified SChessPos message. Does not implicitly {@link msg.SChessPos.verify|verify} messages.
         * @function encode
         * @memberof msg.SChessPos
         * @static
         * @param {msg.ISChessPos} message SChessPos message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessPos.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified SChessPos message, length delimited. Does not implicitly {@link msg.SChessPos.verify|verify} messages.
         * @function encodeDelimited
         * @memberof msg.SChessPos
         * @static
         * @param {msg.ISChessPos} message SChessPos message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SChessPos.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SChessPos message from the specified reader or buffer.
         * @function decode
         * @memberof msg.SChessPos
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {msg.SChessPos} SChessPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessPos.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.SChessPos();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.int32();
                    break;
                case 2:
                    message.y = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("x"))
                throw $util.ProtocolError("missing required 'x'", { instance: message });
            if (!message.hasOwnProperty("y"))
                throw $util.ProtocolError("missing required 'y'", { instance: message });
            return message;
        };

        /**
         * Decodes a SChessPos message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof msg.SChessPos
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {msg.SChessPos} SChessPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SChessPos.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SChessPos message.
         * @function verify
         * @memberof msg.SChessPos
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SChessPos.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.x))
                return "x: integer expected";
            if (!$util.isInteger(message.y))
                return "y: integer expected";
            return null;
        };

        return SChessPos;
    })();

    return msg;
})();

$root.prt = (function() {

    /**
     * Namespace prt.
     * @exports prt
     * @namespace
     */
    var prt = {};

    prt.Student = (function() {

        /**
         * Properties of a Student.
         * @memberof prt
         * @interface IStudent
         * @property {string} name Student name
         * @property {number} id Student id
         */

        /**
         * Constructs a new Student.
         * @memberof prt
         * @classdesc Represents a Student.
         * @implements IStudent
         * @constructor
         * @param {prt.IStudent=} [properties] Properties to set
         */
        function Student(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Student name.
         * @member {string} name
         * @memberof prt.Student
         * @instance
         */
        Student.prototype.name = "";

        /**
         * Student id.
         * @member {number} id
         * @memberof prt.Student
         * @instance
         */
        Student.prototype.id = 0;

        /**
         * Creates a new Student instance using the specified properties.
         * @function create
         * @memberof prt.Student
         * @static
         * @param {prt.IStudent=} [properties] Properties to set
         * @returns {prt.Student} Student instance
         */
        Student.create = function create(properties) {
            return new Student(properties);
        };

        /**
         * Encodes the specified Student message. Does not implicitly {@link prt.Student.verify|verify} messages.
         * @function encode
         * @memberof prt.Student
         * @static
         * @param {prt.IStudent} message Student message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Student.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            return writer;
        };

        /**
         * Encodes the specified Student message, length delimited. Does not implicitly {@link prt.Student.verify|verify} messages.
         * @function encodeDelimited
         * @memberof prt.Student
         * @static
         * @param {prt.IStudent} message Student message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Student.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Student message from the specified reader or buffer.
         * @function decode
         * @memberof prt.Student
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {prt.Student} Student
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Student.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.prt.Student();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes a Student message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof prt.Student
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {prt.Student} Student
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Student.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Student message.
         * @function verify
         * @memberof prt.Student
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Student.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            return null;
        };

        return Student;
    })();

    return prt;
})();