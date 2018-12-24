import * as Router from 'koa-router'

const router = new Router()
import { controller } from '../../controller/api'
import { verifyRecaptcha } from '../../middleware/verify-recaptcha'
import { validDataUrl } from '../../middleware/valid-data-url'
import { handleApiError } from '../../middleware/handle-api-error'

router.prefix('/api')

router.use(async (ctx, next) => {
    console.log('in test api middleware')
    console.log(ctx.request.url)
    await next()
})

router.use(handleApiError)
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

router.get('/top-sites-list', controller.getTopSites)

export { router }
