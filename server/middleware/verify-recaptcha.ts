import { Context } from 'koa'
import { recaptcha } from '../service/recaptcha/service'

export async function verifyRecaptcha(ctx: Context, next: Function) {
    const { token, action } = ctx.query

    const isVerify = await recaptcha.verify(token, action)
    if (!isVerify) {
        ctx.status = 403
        ctx.body = { success: false, msg: 'recaptcha token not valid' }
    } else {
        ctx.body = { success: true, msg: 'recaptcha token  valid' }
    }

    await next()
}
