const driverRoute = require("express").Router();
const { driverController } = require("../../controllers");
const { authMiddleware, DriverAuthMiddleware } = require("../../middlewares/auth.middleware");



driverRoute.get('/bookings', authMiddleware, DriverAuthMiddleware("driver"), driverController.getDiverBooking)
driverRoute.get("/location", authMiddleware, DriverAuthMiddleware("driver"), driverController.updateLocation)


module.exports = driverRoute