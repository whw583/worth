import * as Router from 'koa-router'
const router = new Router()
import { test } from '../../controller/api'

router.get('/test/:domain', test)

export { router }
