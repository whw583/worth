import * as Router from 'koa-router'

const ReportRouter = new Router()
import { controller } from './report.controller'
import { verifyRecaptcha } from '../../../middleware/verify-recaptcha'
import { validDataUrl } from '../../../middleware/valid-data-url'

import { handleApiError } from '../../../middleware/handle-api-error'

ReportRouter.use(handleApiError)

ReportRouter.prefix('/report')

 ReportRouter.use('*/:dataUrl', validDataUrl)
 ReportRouter.use('/protected/', verifyRecaptcha)

ReportRouter.get('/:dataUrl', controller.getOneReport)

ReportRouter.post(
    '/protected/:dataUrl',

    controller.createReportIfNotExist
)

ReportRouter.put(
    '/protected/:dataUrl',

    controller.updateOrCreateOneReport
)

export { ReportRouter }
