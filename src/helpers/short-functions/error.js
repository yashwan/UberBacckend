const { StatusCodes } = require("http-status-codes")

const statusCodeError = (error) => {
    return error.hasOwnProperty("statusCode") ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
}
module.exports = {
    statusCodeError
}