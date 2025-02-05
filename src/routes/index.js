const Route = require("express").Router()
const v1Router = require("./v1")


module.exports = (io) => {
    Route.use("/v1", v1Router(io))
    return Route
}
