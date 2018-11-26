import { generate } from './generate'
import { UrlInfo } from '../../model/url-info'
export async function getOne(domain: string): Promise<object> {
    const res = await UrlInfo.findOne({ dataUrl: domain })

    return generate(res)
}
