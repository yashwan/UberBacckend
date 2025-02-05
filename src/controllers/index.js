const AuthController = require("./auth.controller")
const DriverController = require("./driver.controller")
const PassengerController = require("./passenger.controller")


module.exports = {
    authController: new AuthController(),
    driverController: new DriverController(),
    passengerController: new PassengerController()
}