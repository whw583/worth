import { updateOrCreateOne } from './update'
import { UrlInfo } from '../../model/url-info'

export async function createIfNotExist(dataUrl: string): Promise<object> {
    let fresh: object = { msg: 'no need to create.' }

    const res = await UrlInfo.findOne({ dataUrl: dataUrl })

    if (!res) {
        fresh = await updateOrCreateOne(dataUrl)
    }
    return { ...fresh, dataUrl }
}
