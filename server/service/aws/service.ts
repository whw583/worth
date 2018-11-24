/**
 * awis doc  https://docs.aws.amazon.com/AlexaWebInfoService/latest/Actions.html
 *
 * ats doc  https://docs.aws.amazon.com/AlexaTopSites/latest/ApiReference_TopSitesAction.html
 */

import { parseUrlInfoXMLToJson } from './parse/url-info'
import { parseCategoryBrowseToJson } from './parse/category-browse'
import { parseCategoryListingsToJson } from './parse/category-listings'
import { parseSitesLinkingInToJson } from './parse/sites-linking-in'
import { parseTopSitesCountryToJson } from './parse/top-sites-country'
import { parseTopSitesListCountriesToJson } from './parse/top-sites-list-countries'
import { parseTrafficHistoryToJson } from './parse/traffic-history'
import { requestXml } from './request'

//
export async function getUrlInfo(domain: string): Promise<object> {
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

export async function getTrafficHistory(
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

export async function getCategoryBrowse(Path: string): Promise<object> {
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

export async function getCategoryListings(
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

export async function getSitesLinkingIn(
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

// below are alexa top sites

//
export async function getTopSitesCountry(
    CountryCode: string,
    Start?: number
): Promise<object> {
    const service = 'AlexaTopSites'
    const servicePrefix = 'ats'

    if (!Start) {
        Start = 1
    }

    const path = `/api?Action=TopSites&Count=100&CountryCode=${CountryCode}&ResponseGroup=Country&Start=${Start}`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseTopSitesCountryToJson(processedXml)
}

export async function getTopSitesListCountries(): Promise<object> {
    const service = 'AlexaTopSites'
    const servicePrefix = 'ats'

    const path = `/api?Action=TopSites&ResponseGroup=ListCountries`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseTopSitesListCountriesToJson(processedXml)
}
