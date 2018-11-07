import { readdir } from 'fs'
import { promisify } from 'util'
import * as Koa from 'koa'


export function autoLoadRouter(app: Koa) {
    promisify(readdir)(__dirname + '/../router')
        .then(async function(dirs) {
            for (const dir of dirs) {
                const { router } = await import(`../router/${dir}/router`)
                app.use(router.routes()).use(router.allowedMethods())
            }
        })
        .catch(function(e) {
            console.log('can not load router ...')
            throw new Error(e)
        })
}
