import * as Router from 'koa-router'
const router = new Router()
import { getHtml } from '../../service/ssr/service'
import { join } from 'path'
const serve = require('koa-static')
const DIST_FOLDER = join(process.cwd(), 'dist')



router.get('/test', async ctx => {
    // ctx.body = 'test'

    console.log('test run ...')

    ctx.body = await getHtml('http://localhost:3000')
})

export { router }
