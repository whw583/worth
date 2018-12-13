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
        .sort({ lastModified: 1 })
        .limit(10)

    // return urlInfos
    return urlInfos.map(val => report.generate(val)).map((val: any) => {
        // remove report and usageStatistics
        const { report, usageStatistics, ...temp } = val
        return { ...temp, websiteWorth: report.websiteWorth }
    })
}
