import { getHtml } from '../../service/ssr/service'
import { Context } from 'koa'

export async function getAll(ctx: Context) {
    const url = `${ctx.protocol}://${ctx.hostname}${ctx.url}`

    ctx.body = await getHtml(url)
}
