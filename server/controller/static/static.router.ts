import * as Router from 'koa-router'
const StaticRouter = new Router()

const serve = require('koa-static')
import { getAll } from './static.controller'

// static file
StaticRouter.get('/*.*', serve('./dist/worth', { index: null }))

StaticRouter.get('/*', getAll)

export { StaticRouter }
