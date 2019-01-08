import { Context } from 'koa'
const sm = require('sitemap')

export async function getSitemap(ctx: Context) {
    const sitemap = sm.createSitemap({
        urls: [
            {
                url: 'https://web-worth.net/',
                changefreq: 'daily',
                priority: 0.3,
                links: [
                    { lang: 'cn', url: 'https://cn.web-worth.net/' },
                    { lang: 'tw', url: 'https://tw.web-worth.net/' },
                    { lang: 'hk', url: 'https://hk.web-worth.net/' },
                ],
            },
        ],
    })

    ctx.body = sitemap.toString()
}
