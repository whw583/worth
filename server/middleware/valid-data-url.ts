import { Context } from 'koa'
const psl = require('psl')

export async function validDataUrl(ctx: Context, next: Function) {
    const { dataUrl } = ctx.params
    const parsedDataUrl = psl.parse(dataUrl)
    const isValidDomain = psl.isValid(dataUrl)

    const domain = parsedDataUrl.domain
  console.log(dataUrl)
  console.log(domain)

  if (!domain || !isValidDomain || domain !== dataUrl) {
        ctx.status = 404
        ctx.body = {
            success: false,
            msg: 'please enter exact dataUrl.Subdomain is not valid.',
            input: dataUrl,
        }
        return
    }

    await next()
}
