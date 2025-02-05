const { Booking } = require("../models");
const MainRepository = require("./main.repo")

class BookingRepository extends MainRepository{
    constructor(model){
        super(model)
    }

}

const bookingRepository = new BookingRepository(Booking);

module.exports = bookingRepository;