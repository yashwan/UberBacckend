const logger = require("../helpers/loggers");
const { BOOKING_QUEUE } = require("../Queues/NotificationQueues");
const { getChannel } = require("../utils/rabbitmq.utils");

const bookingProducer = async (data) => {
    let info;
    info =  {userGmail, subject, content} = data
    const channel = await getChannel();
    await channel.assertQueue(BOOKING_QUEUE, {durable: true})
    const message = JSON.stringify(info)
    await channel.sendToQueue(BOOKING_QUEUE, Buffer.from(message))
    logger.info(`[X] Mail send content: ${message}`)
}

module.exports = bookingProducer