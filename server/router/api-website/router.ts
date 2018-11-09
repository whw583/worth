import * as Router from 'koa-router'
const router = new Router()
import { getOneAlexa } from '../../controller/awis.controller'

import { test } from '../../controller/awis.controller'

router.get('/api/test', async ctx => {
    ctx.body = await test()
})

router.get('/api/websites/:domain', async (ctx, next) => {
    const { domain } = ctx.params
    const res = await getOneAlexa(domain)

    ctx.body = res
})

router.post('/api/websites', async (ctx, next) => {
    ctx.body = 'post by name'
})

router.put('/api/websites/name/:name', async (ctx, next) => {
    ctx.body = 'put by name'
})

export { router }
