const redisClient = require("../utils/redis.utils")


class LocationService {
    async setDriver(driverId, socketId) {
        await redisClient.set(socketId, driverId)
        await redisClient.set(`driver:${driverId}`, socketId)
    }

    async getDriver(driverId) {
        return await redisClient.get(`driver:${driverId}`)
    }

    async getDriverBySocketId(socketId) {
        return await redisClient.get(socketId)
    }
    async delDriver(driverId) {
        await redisClient.del(`driver:${driverId}`)
    }

    async addDriversLocation(latitude, longitude, driverId) {
        try {
            await redisClient.geoAdd('driver', {
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
                member: driverId.toString()
            })

        } catch (error) {
            console.log("locations add", error)
        }
    }

    async findNearByDrivers(latitude, longitude, radius = 30) {
        const result = await redisClient.sendCommand([
            'GEORADIUS',
            'driver',
            longitude.toString(),
            latitude.toString(),
            radius.toString(),
            'km',
            'WITHDIST',
            'WITHCOORD'
        ]);
        return result;

    }

    async storeNotifiedDrivers(bookingId, drivers) {
        for (const driver of drivers) {
            await redisClient.sAdd(`notify${bookingId}`, driver)
        }
    }

    async removeNotifiedDriver(bookingId, driver) {
        await redisClient.sRem(`notify${bookingId}`, driver)
    }
    async getNotifiedDrivers(bookingId) {
        return await redisClient.sMembers(`notify${bookingId}`)
    }
}

module.exports = LocationService