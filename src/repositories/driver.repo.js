const { User } = require("../models");
const MainRepository = require("./main.repo");

class DriverRepository extends MainRepository {
    constructor(model){
        super(model)
    }
}

module.exports = new DriverRepository(User);