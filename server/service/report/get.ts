import { generate } from './generate'
import { UrlInfo } from '../../model/url-info'
export async function getOne(dataUrl: string): Promise<object | null> {
    const res = await UrlInfo.findOne({ dataUrl: dataUrl })
    if (!res) {
        return null
    }

    // nothing to do with create report
    const {
        contributingSubdomains,
        rankByCountry,
        siteData,
        rank,
        lastModified,
        usageStatistics,
    } = res as any
    const report = generate(res)
    return {
        contributingSubdomains,
        rankByCountry,
        dataUrl,
        report,
        now: Date.now(),
        siteData,
        rank,
        lastModified,
        usageStatistics,
    }
}
