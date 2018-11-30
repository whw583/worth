import { UrlInfo } from '../../model/url-info'
import { awis } from '../aws/service'

export async function updateOrCreateOne(dataUrl: string): Promise<object> {
    const urlInfoRes = await awis.getUrlInfo(dataUrl)

    const res = await UrlInfo.updateOne(
        { dataUrl: dataUrl },
        { ...urlInfoRes, lastModified: Date.now() },
        { upsert: true }
    )

    return { ...res, dataUrl }
}
