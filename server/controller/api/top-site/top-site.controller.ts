import { Context } from 'koa'
import { getTopSitesList } from '../../../service/top-site-list/service'

export async function getTopSites(ctx: Context) {
    ctx.body = await getTopSitesList()
}
