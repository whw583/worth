import * as Router from 'koa-router'
import { getTopSites } from './top-site.controller'
const TopSiteRouter = new Router()

TopSiteRouter.prefix('/top-sites-list')

TopSiteRouter.get('/', getTopSites)

export { TopSiteRouter }
