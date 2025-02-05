const { User } = require("../models");
const MainRepository = require("./main.repo");


class PassengerRepository extends MainRepository {
    constructor(model) {
        super(model)
    }
}

module.exports = new PassengerRepository(User)