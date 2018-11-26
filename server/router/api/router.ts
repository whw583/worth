import * as Router from 'koa-router'
const router = new Router()
import { controller } from '../../controller/api'

router.get('/api/report/:domain', controller.getOneReport)

router.post('/api/report/:domain', controller.createReportIfNotExist)

router.put('/api/report/:domain', controller.updateOrCreateOneReport)

export { router }
