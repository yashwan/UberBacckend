const { StatusCodes } = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const { BookingService, LocationService } = require("../services");
const logger = require("../helpers/loggers");
const { statusCodeError } = require("../helpers/short-functions/error");

const bookingService = new BookingService()
const locationService = new LocationService()

const createBooking = (io) => {
    return async (req, res, next) => {
        try {
            const user = req.user
            const { destination, passenger } = req.body;
            const source = {
                Latitude: user.location.coordinates[0],
                Longitude: user.location.coordinates[1]
            }

            const booking = await bookingService.createBooking({ source, destination, passenger })
            const nearByDrivers = await bookingService.findNearByDrivers(source)
            const driverIds = []
            for(const driver of nearByDrivers){
                const driverSocketId = await locationService.getDriver(driver[0])

                driverIds.push(driverSocketId)
                console.log(driverSocketId)
                io.to(driverSocketId).emit("newBooking", {
                    bookingId: booking._id,
                    fare: booking.Fare,
                    source: booking.source,
                    destination: booking.destination,
                    distance: booking.distance,
                })
            };


            await locationService.storeNotifiedDrivers(booking._id.toString(), driverIds)
            res.status(StatusCodes.CREATED).send({
                error: null,
                message: "Created car booking successfully.",
                data: booking,
                success: true
            })
            logger.info("Booking created successfully").info(booking)
        } catch (error) {
            next(error)
        }
    }
}

const confirmBooking = (io) => {
    return async (req, res, next) => {
        try {
            const { bookingId } = req.body;
            const user = req.user;
            const booking = await bookingService.assignBooking(bookingId, user._id)
            const notifiedDrivers = await locationService.getNotifiedDrivers(bookingId)

            for (const driverSocketId of notifiedDrivers) {
                const driverId = await locationService.getDriverBySocketId(driverSocketId) // sockets
                if (driverId) {
                    if (driverId === req.user._id.toString()) {
                        io.to(driverSocketId).emit("rideConfirmed", {
                            bookingId,
                            driverId
                        })
                    } else {
                        io.to(driverSocketId).emit("removeBooking", {
                            bookingId
                        })
                        await locationService.removeNotifiedDriver(bookingId, driverId)
                    }
                }
            }

            res.status(StatusCodes.OK).send({
                error: null,
                message: "Driver Assigned successfully",
                data: booking,
                success: true
            })

            logger.info("Driver Assigned successfully").info(`controller:confirmBooking`).info({
                error: null,
                message: "Driver Assigned successfully",
                data: booking,
                success: true
            })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }
}

const getBooking = (socket) => {
    return (req, res, next) => {
        socket.on("getBookings", (data) => {
            console.log(data)
        })
        // get all bookings for the driver
        // const bookings = 
    }
}
module.exports = {
    createBooking,
    confirmBooking,
    getBooking
}