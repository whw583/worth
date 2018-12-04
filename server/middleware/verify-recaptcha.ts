import { Context } from 'koa'
import { recaptcha } from '../service/recaptcha/service'

export async function verifyRecaptcha(ctx: Context, next: Function) {
    const token = ctx.request.header['recaptcha-token']
    const action = ctx.request.header['recaptcha-action']

    console.log('verify recaptcha------------')

    const isVerify = await recaptcha.verify(token, action)

    if (!isVerify) {
        ctx.status = 401
        ctx.body = { success: false, msg: 'recaptcha token not valid' }
        return
    }

    await next()
}
