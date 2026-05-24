class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Captures the stack trace (where the error occurred in the code)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorResponse;