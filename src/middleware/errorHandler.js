const errorHandler = (err, req, res, next) => {
    // Log the error to the console for development debugging
    console.error(err.stack);

    // Default status code is 500 (Internal Server Error)
    let statusCode = err.statusCode || res.statusCode;
    if (statusCode === 200) statusCode = 500;

    let message = err.message || 'Server Error';

    // Mongoose duplicate key error (code 11000)
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // If Express threw a 400 bad request before hitting here (like our validateInput middleware)
    if (res.statusCode === 400) {
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        error: message
    });
};

module.exports = errorHandler;