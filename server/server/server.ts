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
).then(function() {
    app.listen(3000)
})

// auto load router
autoLoadRouter(app)
