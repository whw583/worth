import { Context } from 'koa'
import { recaptcha } from '../service/recaptcha/service'

export async function verifyRecaptcha(ctx: Context, next: Function) {
    const token = ctx.request.header['recaptcha-token']
    const action = ctx.request.header['recaptcha-action']

    const { success, data, status } = await recaptcha.verify(token, action)

    if (!success) {
        ctx.status = 401
        ctx.body = {
            success: false,
            data,
            status,
            msg: 'recaptcha token not valid',
        }
        return
    }

    await next()
}
