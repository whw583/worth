import { Context } from 'koa'
import { awis } from '../service/aws/service'
import { UrlInfo } from '../model/url-info'

export async function test(ctx: Context) {
    const { domain } = ctx.params
    const urlInfoRes = await awis.getUrlInfo(domain)
    const urlInfo = new UrlInfo({ ...urlInfoRes, lastModified: new Date() })

    ctx.body = await urlInfo.save()
}
