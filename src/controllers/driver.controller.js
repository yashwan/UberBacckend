const { StatusCodes } = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const { statusCodeError } = require("../helpers/short-functions/error");


class DriverController {
    async getDiverBooking(req, res, next) {
        try {
            res.status(StatusCodes.OK).send({
                bookingId: "1234",
                success: true,
            })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }

    async updateLocation(req, res, next) {
        try {
            res.status(StatusCodes.OK).send({
                bookingId: "1234",
                success: true,
            })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }
}

module.exports = DriverController