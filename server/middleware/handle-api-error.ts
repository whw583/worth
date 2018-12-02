import { Context } from 'koa'
export async function handleApiError(ctx: Context, next: Function) {
    try {
        await next()
    } catch (e) {
        //
        if (e.message.startsWith('UrlInfoResNotValid')) {
            ctx.status = 404
            ctx.body = { success: false, msg: 'url info res not valid' }
            //
        } else {
            throw e
        }
    }
}
