import { sign } from 'aws4'
import * as rp from 'request-promise'
import { awis } from '../config/config'
const { region, secret, key } = awis
import { readFile } from 'fs'
import { promisify } from 'util'
import { parseXML } from '../helper/parse-xml'

export async function test(): Promise<object> {
    const xml: string = await promisify(readFile)(
        __dirname + '/test.xml',
        'utf-8'
    )

    return parseXML(xml)
}

export async function getOneAlexa(domain: string) {
    const credentials = {
        accessKeyId: key,
        secretAccessKey: secret,
    }
    const ResponseGroup = encodeURIComponent(
        'Categories,Rank,RankByCountry,UsageStats,AdultContent,Speed,Language,OwnedDomains,LinksInCount,SiteData'
    )

    const service = 'awis'
    const host = `${service}.${region}.amazonaws.com`
    const path = `/api?Action=UrlInfo&ResponseGroup=${ResponseGroup}&Url=${domain}`

    const url = `https://${host}${path}`

    const opts = { url, host, service, path }

    const signRes = sign(opts, credentials)

    return await rp(signRes)
}
