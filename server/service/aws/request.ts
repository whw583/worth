import { sign } from 'aws4'
import * as rp from 'request-promise'
import { awis } from '../../config/config'
import { preprocessXML } from './preprocess'
const { region, secret, key } = awis

export async function requestXml(
    service: string,
    servicePrefix: string,
    path: string
): Promise<string> {
    const credentials = {
        accessKeyId: key,
        secretAccessKey: secret,
    }

    const host = `${servicePrefix}.${region}.amazonaws.com`

    const url = `https://${host}${path}`

    const opts = { url, host, service, path, resolveWithFullResponse: true }

    const signRes = sign(opts, credentials)

    const { statusCode, body } = await rp(signRes)

    if (statusCode !== 200) {
        throw new Error('request amazon xml response statusCode not 200.')
    }

    return await preprocessXML(body)
}
