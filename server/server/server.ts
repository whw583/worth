import * as Koa from 'koa'
const app = new Koa()
import { autoLoadRouter } from './auto-load-router'
import { connect, set } from 'mongoose'

import { dbUrl } from '../config/config'

//
set('useCreateIndex', true)

// connect to mongodb
connect(
    dbUrl,
    { useNewUrlParser: true }
).catch(function(error) {
    console.log('catch error in connect db ')
    throw error
})

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

app.listen(3000)
