import * as Koa from 'koa'
const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello koa'
})

app.listen(3000)
