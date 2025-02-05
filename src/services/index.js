const LocationService = require("./location.service");
const PassengerService = require("./passenger.service");
const S3Service = require("./upload.service");

module.exports = {
    AuthService: require("./auth.service"),
    BookingService: require("./booking.service"),
    DriverService: require("./driver.service"),
    passengerService: new PassengerService(),
    LocationService,
    S3Service
}