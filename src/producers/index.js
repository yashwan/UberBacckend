const bookingProducer = require("./booking.produce");
const emailProducer = require("./email.producers");

module.exports = {
    emailProducer,
    bookingProducer
}