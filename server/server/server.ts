import * as Koa from 'koa'
const app = new Koa()
import {router} from '../router/static/static.router'

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)
