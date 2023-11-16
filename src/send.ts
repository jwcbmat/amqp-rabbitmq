import amqp, { Connection, Channel } from "amqplib/callback_api"

import process from "node:process"
import "dotenv/config"

/** AMQP_URL is the URL to the AMQP server. */
const AMQP_URL = process.env.AMQP_URL as string // recommended to use docker container running rabbitmq

/** AMQP_QUEUE is the name of the queue to send messages to.*/
amqp.connect(AMQP_URL, (err: Error | undefined, connection: Connection) => {
    if (err) throw err

    console.log("Connected to AMQP server")
    connection.createChannel((conError: Error | undefined, channel: Channel) => {
        if (conError) throw conError

        const queue = "hello"
        const msg = "Hello World!"
        channel.assertQueue(queue, { durable: false })

        channel.sendToQueue(queue, Buffer.from(msg))

        console.log(`[x] Sent ${msg}`)
    })

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
})
