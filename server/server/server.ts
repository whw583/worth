import * as Koa from 'koa'
const app = new Koa()
import { connectWithRetry } from './connect-mongoose'
const bodyParser = require('koa-bodyparser')
import { ReportRouter } from '../controller/api/report/report.router'
import { TopSiteRouter } from '../controller/api/top-site/top-site.router'
import { StaticRouter } from '../controller/static/static.router'

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
 app.use(TopSiteRouter.routes()).use(TopSiteRouter.allowedMethods())
 app.use(ReportRouter.routes()).use(ReportRouter.allowedMethods())

// static router should be last since including /./  and /*
app.use(StaticRouter.routes()).use(StaticRouter.allowedMethods())

app.listen(3000)

if (process.env.NODE_ENV !== 'production') {
    console.log('server listen on port 3000...')
}
