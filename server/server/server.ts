import * as Koa from 'koa'
const app = new Koa()
import { autoLoadRouter } from './auto-load-router'
import * as mongoose from 'mongoose'
import { dbUrl } from '../config/config'
const bodyParser = require('koa-bodyparser')


//

mongoose.set('useCreateIndex', true)

// connect to mongodb
mongoose
    .connect(
        dbUrl,
        { useNewUrlParser: true }
    )
    .then(function() {
        console.log('mongoose connected...')
        console.log('listen on port 3000...')
        app.listen(3000)
    })
    .catch(function(error) {
        console.log('mongoose connect error')
        console.log(error)
    })

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
