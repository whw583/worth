import * as Koa from 'koa'
const app = new Koa()
import { connectWithRetry } from './connect-mongoose'
const bodyParser = require('koa-bodyparser')
import { router as apiRouter } from '../router/api/router'
import { router as staticRouter } from '../router/static/router'

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

// router here
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

// static router should be last since including /./  and /*
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

console.log('server listen on port 3000...')
app.listen(3000)
