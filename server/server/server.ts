import * as Koa from 'koa'
const app = new Koa()
import { autoLoadRouter } from './auto-load-router'
import { connectWithRetry } from './connect-mongoose'
const bodyParser = require('koa-bodyparser')



// connect to mongodb use mongoose
connectWithRetry()

// body parser
app.use(bodyParser())

// handle error
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})

app.on('error', (err, ctx) => {
    console.log('catch error')
    console.log(err)
})

// auto load router
autoLoadRouter(app)

console.log('server listen on port 3000...')
app.listen(3000)
