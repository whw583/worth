import * as Koa from 'koa'
const app = new Koa()
import { autoLoadRouter } from './auto-load-router'
import { connect } from 'mongoose'

import { dbUrl } from '../config/config'

// connect to mongodb
connect(
    dbUrl,
    { useNewUrlParser: true }
)

// auto load router
autoLoadRouter(app)

app.listen(3000)
