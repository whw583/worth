import * as mongoose from 'mongoose'
import { dbUrl } from '../config/config'
import * as Koa from 'koa'
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

const connectWithRetry = (app: Koa) => {
    console.log('MongoDB connection with retry')
    mongoose
        .connect(
            dbUrl,
            options
        )
        .then(() => {
            console.log('MongoDB is connected')
            console.log('server listen on port 3000...')
            app.listen(3000)
        })
        .catch(err => {
            console.log(
                'MongoDB connection unsuccessful, retry after 5 seconds.'
            )
            setTimeout(connectWithRetry, 5000)
        })
}

export { connectWithRetry }
