const errHandler = (err, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    
    response.status(statusCode);

    response.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? null : err.stack
    });
};

module.exports = { errHandler };
