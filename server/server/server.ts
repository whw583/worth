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
)

// auto load router
autoLoadRouter(app)

app.listen(3000)
