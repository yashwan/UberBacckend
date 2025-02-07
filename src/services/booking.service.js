const { StatusCodes } = require('http-status-codes');
const ApiError = require('../helpers/ApiError');

const BookingModel = require('../models/index').Booking;
const haversine = require("../helpers/haversine")

const LocationService = require("./location.service");
const { bookingRepository } = require('../repositories');

class BookingService {
    BASIC_FARE = 50
    OPERATION_FARE = 7
    locationService = new LocationService()
    async createBooking(data) {
        try {
            const { source, destination, passenger } = data
            const distance = haversine(source.Latitude, source.Longitude, destination.Latitude, destination.Longitude)
            const fare = this.BASIC_FARE + (this.OPERATION_FARE * distance)
            const booking = new BookingModel({
                passenger: passenger,
                source,
                distance,
                destination,
                Fare: Math.ceil(fare)
            })
            await booking.save()
            return booking
        } catch (error) {
            throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getBookingsById(Id) {
        try {
            const bookingById = await BookingModel.findById(Id);
            if (!bookingById) {
                throw new Error(`No booking was created by Id: ${Id}`);
            }
            return bookingById
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getBookings() {
        return await BookingModel.find({})
    }
    async updateBookingsById(Id, data) {
        try {
            const getBookingById = await BookingModel.findById(Id);
            if (!getBookingById) {
                throw new Error(`No booking was created by Id: ${Id}`);
            }
            getBookingById.updateOne(Id, { ...data }, {
                new: true
            })
        } catch (error) {
            throw new Error(error.message);

        }
    }

    async findNearByDrivers(location, radius = 5) {
        if (!location || !location.Latitude || !location.Longitude) {
            throw new ApiError("Invalid co-ordinates", StatusCodes.BAD_REQUEST)
        }
        const latitude = parseFloat(location.Latitude)
        const longitude = parseFloat(location.Longitude)
        const nearByDrivers = await this.locationService.findNearByDrivers(latitude, longitude) // type array;
        return nearByDrivers;

    }

    async deleteBookingsById(Id) {
        try {
            const getBookingById = await BookingModel.findById(Id);
            if (!getBookingById) {
                throw new Error(`No booking was created by Id: ${Id}`);
            }
            await getBookingById.deleteOne(Id).then()
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async assignBooking(bookingId, driverId) {
        const booking = await bookingRepository.getById(bookingId)
        if (!booking) throw new ApiError("Booking does not exist", StatusCodes.BAD_REQUEST)
        booking.status = "confirmed"
        booking.driver = driverId
        await booking.save()
        return booking
    }
}

module.exports = BookingService;