const winston = require("winston");

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '-' + mm + '-' + yyyy;


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD:HH:mm:ss"
        }),
        winston.format.printf(log => `[${log.timestamp}] ${log.level.toUpperCase()} - ${log.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `loggerfile/${formattedToday}.log` }),
    ]
})

module.exports = logger