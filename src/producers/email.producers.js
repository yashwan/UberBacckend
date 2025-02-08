const {EMAIL_QUEUE} = require("../Queues/NotificationQueues")
const {getChannel} = require("../utils/rabbitmq.utils") 

const emailProducer = async (data) => {
    const {userGmail, subject, content} = data
    const channel = await getChannel()
    await channel.assertQueue(EMAIL_QUEUE, {durable: true})
    const message = JSON.stringify({userGmail, subject, content})
    await channel.sendToQueue(EMAIL_QUEUE, Buffer.from(message))
    console.log(`Mail sent to ${message}`)
}

module.exports = emailProducer