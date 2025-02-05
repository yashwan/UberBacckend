const logger = require("./loggers");

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.hasOwnProperty("statusCode") ? (err.statusCode) : 500
    logger.error(`Message: ${err.message}, statusCode: ${err.statusCode}`)
    console.trace();
    res.status(err.statusCode).send({
        message: err.message,
    });
};

module.exports = errorHandler;