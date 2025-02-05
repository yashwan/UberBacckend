const { passengerController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const passengerRoute = require("express").Router()

module.exports = (io) => {
    passengerRoute.post("/create", authMiddleware, passengerController.createPassengerBookings)
    passengerRoute.get("/bookings", authMiddleware, passengerController.getPassengerBookings)
    passengerRoute.post("/feedback", authMiddleware, passengerController.updateFeedback)
    return passengerRoute
}