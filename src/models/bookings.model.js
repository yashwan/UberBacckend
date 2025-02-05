const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    source: {
        Latitude: {
            type: Number,
            required: true,
        },
        Longitude: {
            type: Number,
            required: true,
        }
    },
    destination: {
        Latitude: {
            type: Number,
            required: true,
        },
        Longitude: {
            type: Number,
            required: true,
        }
    },
    distance: {
        type: Number,
        default: 0
    },
    Fare: String,
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "confirmed", "completed", "canceled"]
    },
    payment: {
        type: String,
        default: "pending",
        enum: ["pending", "completed"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    review: {
        type: String,
        default: ""
    }
});


module.exports = mongoose.model('Booking', bookingSchema);