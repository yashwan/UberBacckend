const { authMiddleware } = require("../../middlewares/auth.middleware");
const { createBooking, confirmBooking, getBooking } = require("../../controllers/booking.controller");

const bookingRoute = require("express").Router();


module.exports = (io) => {
    // io.on("connection", (socket) => {
    bookingRoute.get('/', authMiddleware, getBooking(io));
    bookingRoute.post('/', authMiddleware, createBooking(io));
    bookingRoute.post('/confirm', authMiddleware, confirmBooking(io));
    // })
    return bookingRoute
}
