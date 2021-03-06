// source: p_chess.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.msg.SChessInitInfo', null, global);
goog.exportSymbol('proto.msg.SChessMoveInfo', null, global);
goog.exportSymbol('proto.msg.SChessPos', null, global);
goog.exportSymbol('proto.msg.SPlayerInfo', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.msg.SPlayerInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.msg.SPlayerInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.msg.SPlayerInfo.displayName = 'proto.msg.SPlayerInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.msg.SChessInitInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.msg.SChessInitInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.msg.SChessInitInfo.displayName = 'proto.msg.SChessInitInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.msg.SChessPos = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.msg.SChessPos, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.msg.SChessPos.displayName = 'proto.msg.SChessPos';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.msg.SChessMoveInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.msg.SChessMoveInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.msg.SChessMoveInfo.displayName = 'proto.msg.SChessMoveInfo';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.msg.SPlayerInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.msg.SPlayerInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.msg.SPlayerInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SPlayerInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    playername: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    playerid: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.msg.SPlayerInfo}
 */
proto.msg.SPlayerInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.msg.SPlayerInfo;
  return proto.msg.SPlayerInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.msg.SPlayerInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.msg.SPlayerInfo}
 */
proto.msg.SPlayerInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlayername(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPlayerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.msg.SPlayerInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.msg.SPlayerInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.msg.SPlayerInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SPlayerInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * required string playerName = 1;
 * @return {string}
 */
proto.msg.SPlayerInfo.prototype.getPlayername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.msg.SPlayerInfo} returns this
 */
proto.msg.SPlayerInfo.prototype.setPlayername = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SPlayerInfo} returns this
 */
proto.msg.SPlayerInfo.prototype.clearPlayername = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SPlayerInfo.prototype.hasPlayername = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int32 playerId = 2;
 * @return {number}
 */
proto.msg.SPlayerInfo.prototype.getPlayerid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SPlayerInfo} returns this
 */
proto.msg.SPlayerInfo.prototype.setPlayerid = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SPlayerInfo} returns this
 */
proto.msg.SPlayerInfo.prototype.clearPlayerid = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SPlayerInfo.prototype.hasPlayerid = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.msg.SChessInitInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.msg.SChessInitInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.msg.SChessInitInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessInitInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    playerid: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    colorindex: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
    posindex: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.msg.SChessInitInfo}
 */
proto.msg.SChessInitInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.msg.SChessInitInfo;
  return proto.msg.SChessInitInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.msg.SChessInitInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.msg.SChessInitInfo}
 */
proto.msg.SChessInitInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPlayerid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setColorindex(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPosindex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.msg.SChessInitInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.msg.SChessInitInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.msg.SChessInitInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessInitInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * required int32 playerId = 1;
 * @return {number}
 */
proto.msg.SChessInitInfo.prototype.getPlayerid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.setPlayerid = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.clearPlayerid = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessInitInfo.prototype.hasPlayerid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int32 colorIndex = 2;
 * @return {number}
 */
proto.msg.SChessInitInfo.prototype.getColorindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.setColorindex = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.clearColorindex = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessInitInfo.prototype.hasColorindex = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required int32 posIndex = 3;
 * @return {number}
 */
proto.msg.SChessInitInfo.prototype.getPosindex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.setPosindex = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessInitInfo} returns this
 */
proto.msg.SChessInitInfo.prototype.clearPosindex = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessInitInfo.prototype.hasPosindex = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.msg.SChessPos.prototype.toObject = function(opt_includeInstance) {
  return proto.msg.SChessPos.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.msg.SChessPos} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessPos.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    y: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.msg.SChessPos}
 */
proto.msg.SChessPos.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.msg.SChessPos;
  return proto.msg.SChessPos.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.msg.SChessPos} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.msg.SChessPos}
 */
proto.msg.SChessPos.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setY(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.msg.SChessPos.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.msg.SChessPos.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.msg.SChessPos} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessPos.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * required int32 x = 1;
 * @return {number}
 */
proto.msg.SChessPos.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessPos} returns this
 */
proto.msg.SChessPos.prototype.setX = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessPos} returns this
 */
proto.msg.SChessPos.prototype.clearX = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessPos.prototype.hasX = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int32 y = 2;
 * @return {number}
 */
proto.msg.SChessPos.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessPos} returns this
 */
proto.msg.SChessPos.prototype.setY = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessPos} returns this
 */
proto.msg.SChessPos.prototype.clearY = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessPos.prototype.hasY = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.msg.SChessMoveInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.msg.SChessMoveInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.msg.SChessMoveInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessMoveInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    playerid: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    chesspos: (f = msg.getChesspos()) && proto.msg.SChessPos.toObject(includeInstance, f),
    movepos: (f = msg.getMovepos()) && proto.msg.SChessPos.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.msg.SChessMoveInfo}
 */
proto.msg.SChessMoveInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.msg.SChessMoveInfo;
  return proto.msg.SChessMoveInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.msg.SChessMoveInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.msg.SChessMoveInfo}
 */
proto.msg.SChessMoveInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPlayerid(value);
      break;
    case 2:
      var value = new proto.msg.SChessPos;
      reader.readMessage(value,proto.msg.SChessPos.deserializeBinaryFromReader);
      msg.setChesspos(value);
      break;
    case 3:
      var value = new proto.msg.SChessPos;
      reader.readMessage(value,proto.msg.SChessPos.deserializeBinaryFromReader);
      msg.setMovepos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.msg.SChessMoveInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.msg.SChessMoveInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.msg.SChessMoveInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.msg.SChessMoveInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getChesspos();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.msg.SChessPos.serializeBinaryToWriter
    );
  }
  f = message.getMovepos();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.msg.SChessPos.serializeBinaryToWriter
    );
  }
};


/**
 * required int32 playerId = 1;
 * @return {number}
 */
proto.msg.SChessMoveInfo.prototype.getPlayerid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.msg.SChessMoveInfo} returns this
 */
proto.msg.SChessMoveInfo.prototype.setPlayerid = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessMoveInfo} returns this
 */
proto.msg.SChessMoveInfo.prototype.clearPlayerid = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessMoveInfo.prototype.hasPlayerid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required SChessPos chessPos = 2;
 * @return {!proto.msg.SChessPos}
 */
proto.msg.SChessMoveInfo.prototype.getChesspos = function() {
  return /** @type{!proto.msg.SChessPos} */ (
    jspb.Message.getWrapperField(this, proto.msg.SChessPos, 2, 1));
};


/**
 * @param {!proto.msg.SChessPos} value
 * @return {!proto.msg.SChessMoveInfo} returns this
*/
proto.msg.SChessMoveInfo.prototype.setChesspos = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessMoveInfo} returns this
 */
proto.msg.SChessMoveInfo.prototype.clearChesspos = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessMoveInfo.prototype.hasChesspos = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required SChessPos movePos = 3;
 * @return {!proto.msg.SChessPos}
 */
proto.msg.SChessMoveInfo.prototype.getMovepos = function() {
  return /** @type{!proto.msg.SChessPos} */ (
    jspb.Message.getWrapperField(this, proto.msg.SChessPos, 3, 1));
};


/**
 * @param {!proto.msg.SChessPos} value
 * @return {!proto.msg.SChessMoveInfo} returns this
*/
proto.msg.SChessMoveInfo.prototype.setMovepos = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.msg.SChessMoveInfo} returns this
 */
proto.msg.SChessMoveInfo.prototype.clearMovepos = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.msg.SChessMoveInfo.prototype.hasMovepos = function() {
  return jspb.Message.getField(this, 3) != null;
};


goog.object.extend(exports, proto.msg);
