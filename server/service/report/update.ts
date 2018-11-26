import { UrlInfo } from '../../model/url-info'
import { awis } from '../aws/service'

export async function updateOrCreateOne(domain: string): Promise<object> {
    const urlInfoRes = await awis.getUrlInfo(domain)

    return await UrlInfo.updateOne(
        { dataUrl: domain },
        { ...urlInfoRes, lastModified: new Date() },
        { upsert: true }
    )
}
