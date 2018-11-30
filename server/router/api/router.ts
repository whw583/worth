import * as Router from 'koa-router'

const router = new Router()
import { controller } from '../../controller/api'
import { verifyRecaptcha } from '../../middleware/verify-recaptcha'
import { validDataUrl } from '../../middleware/valid-data-url'

router.prefix('/api')

 router.use('/*/:dataUrl', validDataUrl)
 router.use('/protected/', verifyRecaptcha)

router.get('/report/:dataUrl', controller.getOneReport)

router.post(
    '/protected/report/:dataUrl',

    controller.createReportIfNotExist
)

router.put(
    '/protected/report/:dataUrl',

    controller.updateOrCreateOneReport
)

export { router }
