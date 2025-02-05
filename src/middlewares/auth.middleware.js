const jwt = require("jsonwebtoken");
const ApiError = require("../helpers/ApiError");
const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../services/token.service");
const { statusCodeError } = require("../helpers/short-functions/error");

const User = require("../models/index").User;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]
        if (!token) {
            throw new ApiError("Token Not Found", StatusCodes.UNAUTHORIZED)
        }
        const { sub } = verifyToken(token);
        const user = await User.findById(sub)
        req.user = user
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({
            message: error.message
        })
    }
    next()
}

const DriverAuthMiddleware = (role) => (req, res, next) => {
    try {
        const userRole = req.user.role //passenger or driver or intruder
        if ((["passenger", "driver"].filter(r => r === role)).length < 1) {
            res.status(StatusCodes.UNAUTHORIZED).send({
                Message: "Role is not unauthorized"
            })
        }

        if (userRole !== role) {
            res.status(StatusCodes.UNAUTHORIZED).send({
                Message: "User not authorized to this action"
            })
        }
    } catch (error) {
        console.log(error)
        next(new ApiError(statusCodeError(error), error.message))
    }
    next()
}

module.exports = { authMiddleware, DriverAuthMiddleware };