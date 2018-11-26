import { Context } from 'koa'
import { report } from '../service/report/service'

async function getOneReport(ctx: Context) {
    const { domain } = ctx.params
    const res = await report.getOne(domain)
    if (!res) {
        ctx.status = 404
        ctx.body = { success: false, msg: 'nod such dataUrl' }
        return
    }

    ctx.body = res
}

async function createReportIfNotExist(ctx: Context) {
    const { domain } = ctx.params
    const res = await report.createIfNotExist(domain)

    ctx.body = { ...res, dataUrl: domain, success: true }
}

async function updateOrCreateOneReport(ctx: Context) {
    const { domain } = ctx.params
    const res = await report.updateOrCreateOne(domain)
    ctx.body = { ...res, dataUrl: domain, success: true }
}

//
const controller = {
    getOneReport,
    createReportIfNotExist,
    updateOrCreateOneReport,
}

export { controller }
