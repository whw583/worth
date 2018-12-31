import * as Router from 'koa-router'
import { getTopSites } from './top-site.controller'
const TopSiteRouter = new Router()

TopSiteRouter.prefix('/api')

TopSiteRouter.get('/top-sites-list', getTopSites)

export { TopSiteRouter }
