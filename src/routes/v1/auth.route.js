const { authController } = require("../../controllers");
const validator = require("../../middlewares/validator.middleware");
const { authValidator } = require("../../validators");

const authRouter = require("express").Router();


module.exports = (io) => {
    authRouter.post("/register", validator(authValidator), authController.createUser)
    authRouter.post("/login", authController.loginUser(io))
    return authRouter
}
