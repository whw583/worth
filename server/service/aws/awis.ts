/**
 * awis doc  https://docs.aws.amazon.com/AlexaWebInfoService/latest/Actions.html
 *
 */

import { requestXml } from './request'
import { parseUrlInfoXMLToJson } from './parse/url-info'
import { parseTrafficHistoryToJson } from './parse/traffic-history'
import { parseCategoryBrowseToJson } from './parse/category-browse'
import { parseCategoryListingsToJson } from './parse/category-listings'
import { parseSitesLinkingInToJson } from './parse/sites-linking-in'

async function getUrlInfo(domain: string): Promise<object> {
    const service = 'awis'
    const servicePrefix = 'awis'
    const ResponseGroup = encodeURIComponent(
        'Categories,Rank,RankByCountry,UsageStats,AdultContent,Speed,Language,OwnedDomains,LinksInCount,SiteData'
    )
    domain = encodeURIComponent(domain)
    const path = `/api?Action=UrlInfo&ResponseGroup=${ResponseGroup}&Url=${domain}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseUrlInfoXMLToJson(processedXml)
}

async function getTrafficHistory(
    domain: string,
    Range?: number,
    Start?: string
): Promise<object> {
    const service = 'awis'
    const servicePrefix = 'awis'

    // url
    domain = encodeURIComponent(domain)

    // Range
    if (!Range) {
        Range = 31
    }

    // Start param
    const StartParam = Start ? `&Start=${Start}` : ''

    const path = `/api?Action=TrafficHistory&Range=${Range}&ResponseGroup=History${StartParam}&Url=${domain}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseTrafficHistoryToJson(processedXml)
}

async function getCategoryBrowse(Path: string): Promise<object> {
    const service = 'awis'
    const servicePrefix = 'awis'

    // Path example Top/Arts, Top/Business/Automotive
    Path = encodeURIComponent(Path)

    const ResponseGroup = encodeURIComponent(
        'Categories,RelatedCategories,LanguageCategories,LetterBars'
    )

    const path = `/api?Action=CategoryBrowse&Descriptions=True&Path=${Path}&ResponseGroup=${ResponseGroup}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseCategoryBrowseToJson(processedXml)
}

async function getCategoryListings(
    Path: string,
    Start?: number
): Promise<object> {
    const service = 'awis'
    const servicePrefix = 'awis'

    Path = encodeURIComponent(Path)

    const StartParam = Start ? `&Start=${Start}` : ''

    const path =
        '/api?Action=CategoryListings' +
        `&Count=20&Descriptions=True&Path=${Path}&Recursive=True&ResponseGroup=Listings&SortBy=Popularity${StartParam}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseCategoryListingsToJson(processedXml)
}

async function getSitesLinkingIn(
    domain: string,
    Start?: number
): Promise<object> {
    const service = 'awis'
    const servicePrefix = 'awis'

    domain = encodeURIComponent(domain)

    if (!Start) {
        Start = 0
    }

    const path = `/api?Action=SitesLinkingIn&Count=20&ResponseGroup=SitesLinkingIn&Start=${Start}&Url=${domain}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseSitesLinkingInToJson(processedXml)
}

export const awis = {
    getUrlInfo,
    getTrafficHistory,
    getSitesLinkingIn,
    getCategoryBrowse,
    getCategoryListings,
}
