const { errorHandler } = require("./helpers")
const { serviceConfig } = require("./config");
const v1Route = require('./routes');
const { LocationService } = require("./services")

const { hostname } = require("os");
const express = require('express');
const http = require("http")
const cors = require("cors")


const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const redisClient = require('./utils/redis.utils');


const dotenv = require("dotenv");
const logger = require('./helpers/loggers');

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

dotenv.config()

const app = express();


const server = http.createServer(app)
const { Server } = require("socket.io");
const { bookingProducer } = require("./producers");
const locationService = new LocationService()

const io = new Server(server, {
    cors: {
        "origin": "http://127.0.0.1:5500",
        "methods": ["GET", "POST"],
        "credentials": true
    },

})


app.use(cors({
    "origin": "http://127.0.0.1:5500",
    "methods": ["GET", "POST"],
    "credentials": true
}))

const PORT = serviceConfig.PORT || 5000;



let isMongooseRunningSuccessFully;
let isRedisRunningSuccessFully;
let socketIdMain;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable deprecated headers
});
app.use(limiter)


app.use("/api", (req, res, next) => {
    logger.info(`Path: ${req.url} - Method: ${req.method}`)
    next()
}, v1Route(io))

io.on("connection", async (socket) => {
    socketIdMain = socket.id
    socket.on('registerDriver', async (driver) => {
        await locationService.setDriver(driver, socketIdMain);
        console.log("set driver socket");
    });

    socket.on('registerPassenger', async (passenger) => {
        await locationService.setPassenger(passenger, socketIdMain);
        console.log("set passenger socket");
    });
    console.log(socketIdMain)
    socket.on("disconnect", async () => {
        const driverId = locationService.getDriverBySocketId(socketIdMain)
        await locationService.delDriver(`driver:${driverId}`)
        console.log("deleted driver socket");
    })
})

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/healthz", (req, res) => {
    res.send({
        Message: "Api is running successfully",
        hostname: hostname(),
        isMongooseRunningSuccessFully,
        isRedisRunningSuccessFully
    })
})


app.use((req, res, next) => {
    const error = new Error('Route Not found');
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

redisClient.connect().then(() => {
    logger.info("Redis Connected Successfully")
    isRedisRunningSuccessFully = true
}).catch((err) => {
    logger.error(`Unable to connect to the redis server, Error: ${err}`)
    isRedisRunningSuccessFully = false
})


server.listen(PORT, async () => {
    logger.info(`Server is running on PORT: ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    logger.info("DB Connected successfully")
    isMongooseRunningSuccessFully = true
}).catch((err) => {
    logger.error(err)
    isMongooseRunningSuccessFully = false
}
)



module.exports = socketIdMain