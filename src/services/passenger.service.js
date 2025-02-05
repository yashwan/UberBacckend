const { StatusCodes } = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const { passengerRepository } = require("../repositories");
const { statusCodeError } = require("../helpers/short-functions/error");
const passengerConstants = require("../constants").passengerConstants


class PassengerService {
    async findPassengerById(id){
        const passenger = await passengerRepository.getOneByCriteria({_id: id, role: passengerConstants.PASSENGER})
        if(!passenger){
            return await {
                success: true,
                message: "Passenger not found",
                error: {}
            }
        }
    }

    async UpdateFeedback({passenger, rating, review}){
        try {
            const passengerResponse = await passengerRepository.get(passenger) 
            if(!passengerResponse){
                throw new ApiError("User not found", StatusCodes.BAD_REQUEST)
            }

            passengerResponse.rating = rating
            passengerResponse.review = review
            
            await passengerResponse.save()

            return {
                success: true,
                message: "updated feedback successfully",
                response,
                error: null
            }
        } catch (error) {
            throw new ApiError(error.message, statusCodeError(error))
        }
    }
}

module.exports = PassengerService