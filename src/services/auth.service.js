const { StatusCodes } = require("http-status-codes");
const ApiError = require("../helpers/ApiError");
const { generateAuthToken } = require("./token.service");
const { serviceConfig } = require("../config");
const { LocationService } = require(".");
const { emailProducer } = require("../producers");
const User = require('../models').User;


class AuthService {
    locationService = new LocationService()
    async createUser(data) {
        const isEmailTaken = await User.isEmailTaken(data.email);
        if (isEmailTaken) {
            throw new ApiError("Email is Already Taken", StatusCodes.OK)
        }
        const user = new User(data);
        await user.save();
        await emailProducer({
            userGmail: data.email,
            subject: "Email Created",
            content: `hey ${data.name}, thanks for creating your profile with the Destiny`
        })
        const token = generateAuthToken(user._id, serviceConfig.EXPIRY_TIME)
        return {
            data: {
                user,
                tokens: token
            },
            success: true,
            error: null
        }
    }

    async getUser(email, password, coordinates) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError('User not found', StatusCodes.BAD_REQUEST);
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError('Password is incorrect', StatusCodes.BAD_REQUEST)
        }
        user.location.coordinates = coordinates
        console.log(coordinates)
        await user.save()
        if (user.role === 'driver') {
            await this.locationService.setDriver(user._id, socketId)
            await this.locationService.addDriversLocation(coordinates[0], coordinates[1], user._id)
        }
        const token = generateAuthToken(user._id, serviceConfig.EXPIRY_TIME);
        const { name, _id, location, role } = user
        await emailProducer({
            userGmail: email,
            subject: "Email Created",
            content: `hey ${name}, thanks for creating your profile with the Destiny`
        })

        return {
            data: {
                user: {
                    name,
                    email,
                    _id,
                    location,
                    role
                },
                tokens: token
            },
            success: true,
            error: null
        };
    }
    async updateUserByEmail(email, data) {
        try {
            const getUserByEmail = await User.findOne({ email })
            if (!getUserByEmail) {
                throw new ApiError(`No User found by the given Email: ${email}`, StatusCodes.BAD_REQUEST);
            }
            await getUserByEmail.updateOne(data, { new: true })
        } catch (error) {
            throw new ApiError(error.message, error.StatusCode);

        }
    }

}


module.exports = AuthService;