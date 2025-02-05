const { StatusCodes } = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

class DriverService {
    async getDriverBookings(){
        try{

        }catch(error){
            throw new ApiError("", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateLocation(){
        try {
            
        } catch (error) {
            throw new ApiError("", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = DriverService