import * as mongoose from 'mongoose'
import { dbUrl } from '../config/config'

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // my config
    useNewUrlParser: true,
}

let retryCount = 0
const retryLimit = 3

const connectWithRetry = () => {
    console.log(`MongoDB connection with retry, connecting...`)

    //
    mongoose
        .connect(
            dbUrl,
            options
        )
        .then(() => {
            console.log('MongoDB is connected')
        })
        .catch(err => {
            if (retryCount >= retryLimit) {
                console.log('retry limit exceed, try again later...')
                process.exit(1)
            }
            retryCount++

            console.log(
                'MongoDB connection unsuccessful, retry after 5 seconds.'
            )

            setTimeout(connectWithRetry, 5000)
        })
}

export { connectWithRetry }
