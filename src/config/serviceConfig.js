const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    REDISURI: process.env.REDIS_URI,
    EXPIRY_TIME: process.env.EXPIRY_TIME || 30
}