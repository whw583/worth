import { UrlInfo } from '../../model/url-info'
import { awis } from '../aws/service'
import { ErrorCode } from '@angular/compiler-cli/src/ngtsc/diagnostics'

export function shoudHaveOneUsageStatistic(obj: any): boolean {
    if (obj && obj.usageStatistics && obj.usageStatistics.length > 0) {
        return true
    } else {
        return false
    }
}

export async function updateOrCreateOne(dataUrl: string): Promise<object> {
    const urlInfoRes = await awis.getUrlInfo(dataUrl)

    // valid data
    const isValid = shoudHaveOneUsageStatistic(urlInfoRes)

    if (!isValid) {
        throw new Error('UrlInfoResNotValid: should have at least one  usage statistic')
    }

    const res = await UrlInfo.updateOne(
        { dataUrl: dataUrl },
        { ...urlInfoRes, lastModified: Date.now() },
        { upsert: true }
    )

    return { ...res, dataUrl }
}
