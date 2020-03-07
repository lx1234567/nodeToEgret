type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

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
