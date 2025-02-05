const { StatusCodes } = require("http-status-codes");
const { passengerService } = require("../services");
const ApiError = require("../helpers/ApiError");
const { statusCodeError } = require("../helpers/short-functions/error");
const { LocationService, BookingService} = require("../services")

class PassengerController{

    locationService = new LocationService();
    bookingService = new BookingService();

    async createPassengerBookings(req, res, next){
        try {
            const user = req.user
            const { destination, passenger } = req.body;
            const source = {
                Latitude: user.location.coordinates[0],
                Longitude: user.location.coordinates[1]
            }
            const response = await bookingService.createBooking({ source, destination, passenger })
            res.status(StatusCodes.CREATED).send({ response })
        } catch (error) {
            next(new ApiError(error.message, statusCodeError(error)))
        }
    }

    async getPassengerBookings(req, res, next){
        try {
            const {id} = req.body;
            const passenger = await passengerService.findPassengerById(id)
            res.status(StatusCodes.OK).send(passenger)
        }catch(error){
            next(error)
        }
    }

    async updateFeedback(req, res, next){
        try {
            const {passenger, rating, review} = req.body;
            const response = await passengerService.UpdateFeedback({passenger, rating, review})
            res.status(StatusCodes.OK).send({
                response
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PassengerController