import * as Router from 'koa-router'
const ApiRouter = new Router()
import { ReportRouter } from './report/report.router'
import { TopSiteRouter } from './top-site/top-site.router'

ApiRouter.prefix('/api')
ApiRouter.use(ReportRouter.routes(), ReportRouter.allowedMethods())
ApiRouter.use(TopSiteRouter.routes(), TopSiteRouter.allowedMethods())

export { ApiRouter }
