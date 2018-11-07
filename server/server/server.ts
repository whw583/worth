import * as Koa from 'koa'
const app = new Koa()
import {autoLoadRouter} from './auto-load-router'




// auto load router
autoLoadRouter(app)

app.listen(3000)
