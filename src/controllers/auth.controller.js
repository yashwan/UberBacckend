const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.service");
const ApiError = require("../helpers/ApiError");
const logger = require("../helpers/loggers");
const { statusCodeError } = require("../helpers/short-functions/error");

const authService = new AuthService();

class AuthController {
    async createUser(req, res, next) {
        try {
            const { name, email, password, role, location } = req.body;
            const response = await authService.createUser({ name, email, password, role, location })
            res.status(StatusCodes.CREATED).send({
                message: "create successfully",
                ...response,
            })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }

    loginUser = (io) => {
        var socketId;
        // io.on("connection", (socket) => {
        //     socketId = socket.id
        // })
        return async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const response = await authService.getUser(email, password, socketId);
            res.setHeader("Authorization", `Bearer: ${response.data.tokens.access.token}`)
            res.status(StatusCodes.OK).send({
                ...response,
                message: "logged in successfully"
            })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }}
}

module.exports = AuthController