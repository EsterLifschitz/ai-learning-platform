const errorHandler = (err, req, res, next) => {
     
    console.error(err.stack);

     
    let statusCode = err.statusCode || res.statusCode;
    if (statusCode === 200) statusCode = 500;

    let message = err.message || 'Server Error';

     
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

     
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

     
    if (res.statusCode === 400) {
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        error: message
    });
};

module.exports = errorHandler;