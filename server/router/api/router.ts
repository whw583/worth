import * as Router from 'koa-router'
const router = new Router()
import { controller } from '../../controller/api'
import { verifyRecaptcha } from '../../middleware/verify-recaptcha'

router.get('/api/report/:domain', controller.getOneReport)

router.post(
    '/api/report/:domain',
    verifyRecaptcha,
    controller.createReportIfNotExist
)

router.put('/api/report/:domain', controller.updateOrCreateOneReport)

export { router }
