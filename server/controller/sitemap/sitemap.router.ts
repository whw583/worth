import * as Router from 'koa-router'
const SitemapRouter = new Router()


import { getSitemap} from './sitemap.controller'



SitemapRouter.get('/sitemap.xml', getSitemap)

export { SitemapRouter }
