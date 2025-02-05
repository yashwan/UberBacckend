const { StatusCodes } = require("http-status-codes")
const ApiError = require("../helpers/ApiError")
const logger = require("../helpers/loggers")

const validator = (schema) => {
    return async (req, res, next) => {
        try {
            const validatated = await schema.parse(req.body)
            logger.info(`Info validated succesfully: ${validatated}`)
            next()
        } catch (error) {
            const newError = new ApiError(error.message, StatusCodes.BAD_REQUEST)
            next(newError)
        }
    }
}

module.exports = validator