var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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