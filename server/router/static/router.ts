import * as Router from 'koa-router'
const router = new Router()
import { getHtml } from '../../service/ssr/service'
const serve = require('koa-static')

// static file
router.get('/*.*', serve('./dist/worth', { index: null }))

router.get('/*', async ctx => {
    const url = `${ctx.protocol}://${ctx.hostname}${ctx.url}`
    console.log(url)

    console.time('time-used')

    ctx.body = await getHtml(url)
    console.timeEnd('time-used')
})

export { router }
