import * as Router from 'koa-router'
const router = new Router()
import { getUrlInfoXml } from '../../controller/awis.controller'
import { parseUrlInfoXMLToJson } from '../../helper/parse-xml'
import { preprocessXML } from '../../helper/preprocess-xml'

router.get('/api/test/:test/:domain', async ctx => {
    const { domain, test } = ctx.params
    const xml = await getUrlInfoXml(domain)
    const processedXml = await preprocessXML(xml)

    let body: string | object = processedXml

    if (test === 'json') {
        body = parseUrlInfoXMLToJson(processedXml)
    }

    ctx.body = body
})

router.get('/api/websites/:domain', async (ctx, next) => {
    const { domain } = ctx.params
    const xml = await getUrlInfoXml(domain)

    ctx.body = xml
})

router.post('/api/websites', async (ctx, next) => {
    ctx.body = 'post by name'
})

router.put('/api/websites/name/:name', async (ctx, next) => {
    ctx.body = 'put by name'
})

export { router }
