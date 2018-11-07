import * as Router from 'koa-router'
import axios from 'axios'
const router = new Router()
import { recaptchaSecrectKey, recaptchaUrl } from '../../config/config'

router.get('/test/test', async ctx => {
    const token = ctx.query.token

    const { data } = await axios.post(
        `https://recaptcha.net/recaptcha/api/siteverify?secret=${recaptchaSecrectKey}&response=${token}`,
        {},
        {
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8',
            },
        }
    )

    console.log(data)

    ctx.body = data
})

export { router }
