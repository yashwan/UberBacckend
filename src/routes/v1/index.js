const Router = require("express").Router();
const authRoute = require("./auth.route");
const bookingRoute = require("./booking.route");
const driverRoute = require("./driver.route");




module.exports = (io) => {
    Router.use("/booking", bookingRoute(io))
    Router.use("/auth", authRoute(io))
    Router.use("/driver", driverRoute)
    return Router
}