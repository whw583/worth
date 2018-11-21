import { sign } from 'aws4'
import * as rp from 'request-promise'
import { awis } from '../config/config'
const { region, secret, key } = awis
import { parseUrlInfoXMLToJson } from '../helper/parse-xml'
import { preprocessXML } from '../helper/preprocess-xml'

// return processed xml, not aws origin xml
export async function getProcessedUrlInfoXml(domain: string): Promise<string> {
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

    const opts = { url, host, service, path, resolveWithFullResponse: true }

    const signRes = sign(opts, credentials)

    const { statusCode, body } = await await rp(signRes)

    if (statusCode !== 200) {
        throw new Error('get url info xml response statusCode not 200.')
    }

    return await preprocessXML(body)
}

export async function getUrlInfoJson(domain: string): Promise<object> {
    const processedXml = await getProcessedUrlInfoXml(domain)
  return  parseUrlInfoXMLToJson(processedXml)
}
