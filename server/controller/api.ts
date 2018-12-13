import { Context } from 'koa'
import { report } from '../service/report/service'
import { getTopSitesList } from '../service/top-site-list/service'

async function getOneReport(ctx: Context) {
    const { dataUrl } = ctx.params

    const res = await report.getOne(dataUrl)
    if (!res) {
        ctx.status = 404
        ctx.body = { success: false, msg: 'nod such dataUrl' }
        return
    }

    ctx.body = res
}

async function createReportIfNotExist(ctx: Context) {
    const { dataUrl } = ctx.params
    const res = await report.createIfNotExist(dataUrl)

    ctx.body = { ...res, success: true }
}

async function updateOrCreateOneReport(ctx: Context) {
    const { dataUrl } = ctx.params
    const res = await report.updateOrCreateOne(dataUrl)
    ctx.body = { ...res, dataUrl: dataUrl, success: true }
}

async function getTopSites(ctx: Context) {
    ctx.body = await getTopSitesList()
}

//
const controller = {
    getOneReport,
    createReportIfNotExist,
    updateOrCreateOneReport,
    getTopSites,
}

export { controller }
