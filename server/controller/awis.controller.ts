import { sign } from 'aws4'
import * as rp from 'request-promise'
import { awis } from '../config/config'
const { region, secret, key } = awis

export async function getUrlInfoXml(domain: string): Promise<string> {
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
