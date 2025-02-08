const amqp = require("amqplib")

let channel, connection
const connectRabbitMQ = async () => {
    connection = await amqp.connect("amqp://localhost")
    channel = await connection.createChannel()
    return channel
}

const getChannel = async () => {
    if(!channel){
        await connectRabbitMQ()
    }
    return channel
}

module.exports = {
    getChannel
}