import * as Router from 'koa-router'
const router = new Router()
import {
    getProcessedUrlInfoXml,
    getUrlInfoJson,
} from '../../controller/awis.controller'

router.get('/api/websites/xml/:domain', async ctx => {
    const { domain } = ctx.params
    ctx.body = await getProcessedUrlInfoXml(domain)
})

router.get('/api/websites/:domain', async (ctx, next) => {
    const { domain } = ctx.params
    ctx.body = await getUrlInfoJson(domain)
})

router.post('/api/websites', async (ctx, next) => {
    ctx.body = 'post by name'
})

router.put('/api/websites/name/:name', async (ctx, next) => {
    ctx.body = 'put by name'
})

export { router }
