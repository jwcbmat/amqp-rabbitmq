import amqp from "amqplib/callback_api"
import process from "node:process"

const AMQP_URL = "amqp://localhost"

amqp.connect(AMQP_URL, (err, connection) => {
    if(err) throw err

    connection.createChannel((conError, channel) => {
        if (conError) throw err

        const queue = "hello"

        console.log(`[*] Waiting for messages in ${queue}`)

        channel.consume(queue, (msg) => {
            if (msg) console.log(`[x] Received ${msg.content.toString()}`)
        }, { noAck: !!process.env.ACK_CONTROLLER })
    })
})