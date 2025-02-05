
const redis = require("redis");
const { serviceConfig } = require("../config");



const redisClient = redis.createClient({
    url: serviceConfig.REDISURI
})


module.exports = redisClient