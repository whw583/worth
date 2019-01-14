import { UrlInfo } from '../../model/url-info'
import { report } from '../report/service'

export async function getTopSitesList(): Promise<object[]> {
    const urlInfos: any[] = await UrlInfo.find(
        {},
        {
            _id: false,
            __v: false,
            ownedDomains: false,
            rankByCountry: false,
            categories: false,
            contributingSubdomains: false,
            adultContent: false,
            speed: false,
        }
    )
        .sort({ lastModified: -1 })
        .limit(100)

    // return urlInfos
    return urlInfos.map((urlInfo: any) => {
        // remove report and usageStatistics

        const reportObj = report.generate(urlInfo) as any
        const { dataUrl, siteData, rank, lastModified } = urlInfo

        return {
            websiteWorth: reportObj.websiteWorth,
            dataUrl,
            siteData,
            rank,
            lastModified,
            now: Date.now(),
        }
    })
}
