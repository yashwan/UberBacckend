const jwt = require("jsonwebtoken");
const { serviceConfig } = require("../config");



const generateToken = (userId, timeInMins, type) => {
    const payload = {
        sub: userId,
        type: type
    }

    return jwt.sign(payload, serviceConfig.JWT_SECRET, {
        expiresIn: timeInMins 
    })
}


const generateAuthToken = (userId, timeInMins) => {

    const accessToken = generateToken(userId, timeInMins * 60, "access");
    const refreshToken = generateToken(userId, 7 * 60 * 24 * 60, "refresh");


    return {
        access: {
            accessToken,
            expiresIn: timeInMins * 60
        },
        refresh: {
            refreshToken,
            expiresIn: 7 * 60 * 24 * 60
        }
    }
}

const verifyToken = (token) => {
    return jwt.verify(token, serviceConfig.JWT_SECRET)
}

module.exports = {
    generateToken,
    generateAuthToken,
    verifyToken
}