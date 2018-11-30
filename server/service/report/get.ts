import { generate } from './generate'
import { UrlInfo } from '../../model/url-info'
export async function getOne(dataUrl: string): Promise<object | null> {
    const res = await UrlInfo.findOne({ dataUrl: dataUrl })
    if (!res) {
        return null
    }
    return generate(res)
}
