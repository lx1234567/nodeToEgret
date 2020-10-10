type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace msg. */
declare namespace msg {

    /** Properties of a S2CInitGame. */
    interface IS2CInitGame {

        /** S2CInitGame player1 */
        player1: msg.ISChessInitInfo;

        /** S2CInitGame player2 */
        player2: msg.ISChessInitInfo;
    }

    /** Represents a S2CInitGame. */
    class S2CInitGame implements IS2CInitGame {

        /**
         * Constructs a new S2CInitGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IS2CInitGame);

        /** S2CInitGame player1. */
        public player1: msg.ISChessInitInfo;

        /** S2CInitGame player2. */
        public player2: msg.ISChessInitInfo;

        /**
         * Creates a new S2CInitGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CInitGame instance
         */
        public static create(properties?: msg.IS2CInitGame): msg.S2CInitGame;

        /**
         * Encodes the specified S2CInitGame message. Does not implicitly {@link msg.S2CInitGame.verify|verify} messages.
         * @param message S2CInitGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IS2CInitGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified S2CInitGame message, length delimited. Does not implicitly {@link msg.S2CInitGame.verify|verify} messages.
         * @param message S2CInitGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IS2CInitGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a S2CInitGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CInitGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.S2CInitGame;

        /**
         * Decodes a S2CInitGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CInitGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.S2CInitGame;

        /**
         * Verifies a S2CInitGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a S2CPlayInitInfo. */
    interface IS2CPlayInitInfo {

        /** S2CPlayInitInfo playerInfo */
        playerInfo: msg.ISPlayerInfo;
    }

    /** Represents a S2CPlayInitInfo. */
    class S2CPlayInitInfo implements IS2CPlayInitInfo {

        /**
         * Constructs a new S2CPlayInitInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IS2CPlayInitInfo);

        /** S2CPlayInitInfo playerInfo. */
        public playerInfo: msg.ISPlayerInfo;

        /**
         * Creates a new S2CPlayInitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayInitInfo instance
         */
        public static create(properties?: msg.IS2CPlayInitInfo): msg.S2CPlayInitInfo;

        /**
         * Encodes the specified S2CPlayInitInfo message. Does not implicitly {@link msg.S2CPlayInitInfo.verify|verify} messages.
         * @param message S2CPlayInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IS2CPlayInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified S2CPlayInitInfo message, length delimited. Does not implicitly {@link msg.S2CPlayInitInfo.verify|verify} messages.
         * @param message S2CPlayInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IS2CPlayInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a S2CPlayInitInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.S2CPlayInitInfo;

        /**
         * Decodes a S2CPlayInitInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.S2CPlayInitInfo;

        /**
         * Verifies a S2CPlayInitInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a S2CPlayMoveChess. */
    interface IS2CPlayMoveChess {

        /** S2CPlayMoveChess info */
        info: msg.ISChessMoveInfo;
    }

    /** Represents a S2CPlayMoveChess. */
    class S2CPlayMoveChess implements IS2CPlayMoveChess {

        /**
         * Constructs a new S2CPlayMoveChess.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IS2CPlayMoveChess);

        /** S2CPlayMoveChess info. */
        public info: msg.ISChessMoveInfo;

        /**
         * Creates a new S2CPlayMoveChess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayMoveChess instance
         */
        public static create(properties?: msg.IS2CPlayMoveChess): msg.S2CPlayMoveChess;

        /**
         * Encodes the specified S2CPlayMoveChess message. Does not implicitly {@link msg.S2CPlayMoveChess.verify|verify} messages.
         * @param message S2CPlayMoveChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IS2CPlayMoveChess, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified S2CPlayMoveChess message, length delimited. Does not implicitly {@link msg.S2CPlayMoveChess.verify|verify} messages.
         * @param message S2CPlayMoveChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IS2CPlayMoveChess, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a S2CPlayMoveChess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.S2CPlayMoveChess;

        /**
         * Decodes a S2CPlayMoveChess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.S2CPlayMoveChess;

        /**
         * Verifies a S2CPlayMoveChess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a C2SMoveChess. */
    interface IC2SMoveChess {

        /** C2SMoveChess info */
        info: msg.ISChessMoveInfo;
    }

    /** Represents a C2SMoveChess. */
    class C2SMoveChess implements IC2SMoveChess {

        /**
         * Constructs a new C2SMoveChess.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2SMoveChess);

        /** C2SMoveChess info. */
        public info: msg.ISChessMoveInfo;

        /**
         * Creates a new C2SMoveChess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMoveChess instance
         */
        public static create(properties?: msg.IC2SMoveChess): msg.C2SMoveChess;

        /**
         * Encodes the specified C2SMoveChess message. Does not implicitly {@link msg.C2SMoveChess.verify|verify} messages.
         * @param message C2SMoveChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2SMoveChess, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2SMoveChess message, length delimited. Does not implicitly {@link msg.C2SMoveChess.verify|verify} messages.
         * @param message C2SMoveChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2SMoveChess, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2SMoveChess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2SMoveChess;

        /**
         * Decodes a C2SMoveChess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMoveChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2SMoveChess;

        /**
         * Verifies a C2SMoveChess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a C2SPlayInitInfo. */
    interface IC2SPlayInitInfo {

        /** C2SPlayInitInfo playerInfo */
        playerInfo: msg.ISPlayerInfo;
    }

    /** Represents a C2SPlayInitInfo. */
    class C2SPlayInitInfo implements IC2SPlayInitInfo {

        /**
         * Constructs a new C2SPlayInitInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2SPlayInitInfo);

        /** C2SPlayInitInfo playerInfo. */
        public playerInfo: msg.ISPlayerInfo;

        /**
         * Creates a new C2SPlayInitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SPlayInitInfo instance
         */
        public static create(properties?: msg.IC2SPlayInitInfo): msg.C2SPlayInitInfo;

        /**
         * Encodes the specified C2SPlayInitInfo message. Does not implicitly {@link msg.C2SPlayInitInfo.verify|verify} messages.
         * @param message C2SPlayInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2SPlayInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2SPlayInitInfo message, length delimited. Does not implicitly {@link msg.C2SPlayInitInfo.verify|verify} messages.
         * @param message C2SPlayInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2SPlayInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2SPlayInitInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2SPlayInitInfo;

        /**
         * Decodes a C2SPlayInitInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SPlayInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2SPlayInitInfo;

        /**
         * Verifies a C2SPlayInitInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a SPlayerInfo. */
    interface ISPlayerInfo {

        /** SPlayerInfo playerName */
        playerName: string;

        /** SPlayerInfo playerId */
        playerId: number;
    }

    /** Represents a SPlayerInfo. */
    class SPlayerInfo implements ISPlayerInfo {

        /**
         * Constructs a new SPlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISPlayerInfo);

        /** SPlayerInfo playerName. */
        public playerName: string;

        /** SPlayerInfo playerId. */
        public playerId: number;

        /**
         * Creates a new SPlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SPlayerInfo instance
         */
        public static create(properties?: msg.ISPlayerInfo): msg.SPlayerInfo;

        /**
         * Encodes the specified SPlayerInfo message. Does not implicitly {@link msg.SPlayerInfo.verify|verify} messages.
         * @param message SPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SPlayerInfo message, length delimited. Does not implicitly {@link msg.SPlayerInfo.verify|verify} messages.
         * @param message SPlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISPlayerInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SPlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SPlayerInfo;

        /**
         * Decodes a SPlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SPlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SPlayerInfo;

        /**
         * Verifies a SPlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a SChessInitInfo. */
    interface ISChessInitInfo {

        /** SChessInitInfo playerId */
        playerId: number;

        /** SChessInitInfo colorIndex */
        colorIndex: number;

        /** SChessInitInfo posIndex */
        posIndex: number;
    }

    /** Represents a SChessInitInfo. */
    class SChessInitInfo implements ISChessInitInfo {

        /**
         * Constructs a new SChessInitInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISChessInitInfo);

        /** SChessInitInfo playerId. */
        public playerId: number;

        /** SChessInitInfo colorIndex. */
        public colorIndex: number;

        /** SChessInitInfo posIndex. */
        public posIndex: number;

        /**
         * Creates a new SChessInitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SChessInitInfo instance
         */
        public static create(properties?: msg.ISChessInitInfo): msg.SChessInitInfo;

        /**
         * Encodes the specified SChessInitInfo message. Does not implicitly {@link msg.SChessInitInfo.verify|verify} messages.
         * @param message SChessInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISChessInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SChessInitInfo message, length delimited. Does not implicitly {@link msg.SChessInitInfo.verify|verify} messages.
         * @param message SChessInitInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISChessInitInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SChessInitInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SChessInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SChessInitInfo;

        /**
         * Decodes a SChessInitInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SChessInitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SChessInitInfo;

        /**
         * Verifies a SChessInitInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a SChessMoveInfo. */
    interface ISChessMoveInfo {

        /** SChessMoveInfo playerId */
        playerId: number;

        /** SChessMoveInfo chessPos */
        chessPos: msg.ISChessPos;

        /** SChessMoveInfo movePos */
        movePos: msg.ISChessPos;
    }

    /** Represents a SChessMoveInfo. */
    class SChessMoveInfo implements ISChessMoveInfo {

        /**
         * Constructs a new SChessMoveInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISChessMoveInfo);

        /** SChessMoveInfo playerId. */
        public playerId: number;

        /** SChessMoveInfo chessPos. */
        public chessPos: msg.ISChessPos;

        /** SChessMoveInfo movePos. */
        public movePos: msg.ISChessPos;

        /**
         * Creates a new SChessMoveInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SChessMoveInfo instance
         */
        public static create(properties?: msg.ISChessMoveInfo): msg.SChessMoveInfo;

        /**
         * Encodes the specified SChessMoveInfo message. Does not implicitly {@link msg.SChessMoveInfo.verify|verify} messages.
         * @param message SChessMoveInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISChessMoveInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SChessMoveInfo message, length delimited. Does not implicitly {@link msg.SChessMoveInfo.verify|verify} messages.
         * @param message SChessMoveInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISChessMoveInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SChessMoveInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SChessMoveInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SChessMoveInfo;

        /**
         * Decodes a SChessMoveInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SChessMoveInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SChessMoveInfo;

        /**
         * Verifies a SChessMoveInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a SChessPos. */
    interface ISChessPos {

        /** SChessPos x */
        x: number;

        /** SChessPos y */
        y: number;
    }

    /** Represents a SChessPos. */
    class SChessPos implements ISChessPos {

        /**
         * Constructs a new SChessPos.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISChessPos);

        /** SChessPos x. */
        public x: number;

        /** SChessPos y. */
        public y: number;

        /**
         * Creates a new SChessPos instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SChessPos instance
         */
        public static create(properties?: msg.ISChessPos): msg.SChessPos;

        /**
         * Encodes the specified SChessPos message. Does not implicitly {@link msg.SChessPos.verify|verify} messages.
         * @param message SChessPos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISChessPos, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SChessPos message, length delimited. Does not implicitly {@link msg.SChessPos.verify|verify} messages.
         * @param message SChessPos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISChessPos, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SChessPos message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SChessPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SChessPos;

        /**
         * Decodes a SChessPos message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SChessPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SChessPos;

        /**
         * Verifies a SChessPos message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}

/** Namespace prt. */
declare namespace prt {

    /** Properties of a Student. */
    interface IStudent {

        /** Student name */
        name: string;

        /** Student id */
        id: number;
    }

    /** Represents a Student. */
    class Student implements IStudent {

        /**
         * Constructs a new Student.
         * @param [properties] Properties to set
         */
        constructor(properties?: prt.IStudent);

        /** Student name. */
        public name: string;

        /** Student id. */
        public id: number;

        /**
         * Creates a new Student instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Student instance
         */
        public static create(properties?: prt.IStudent): prt.Student;

        /**
         * Encodes the specified Student message. Does not implicitly {@link prt.Student.verify|verify} messages.
         * @param message Student message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: prt.IStudent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Student message, length delimited. Does not implicitly {@link prt.Student.verify|verify} messages.
         * @param message Student message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: prt.IStudent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Student message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Student
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): prt.Student;

        /**
         * Decodes a Student message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Student
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): prt.Student;

        /**
         * Verifies a Student message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}
