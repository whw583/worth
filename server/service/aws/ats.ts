/**
 *
 * ats doc  https://docs.aws.amazon.com/AlexaTopSites/latest/ApiReference_TopSitesAction.html
 */
import { requestXml } from './request'
import { parseTopSitesCountryToJson } from './parse/top-sites-country'
import { parseTopSitesListCountriesToJson } from './parse/top-sites-list-countries'

 async function getTopSitesCountry(
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

 async function getTopSitesListCountries(): Promise<object> {
    const service = 'AlexaTopSites'
    const servicePrefix = 'ats'

    const path = `/api?Action=TopSites&ResponseGroup=ListCountries`

    // request
    const processedXml = await requestXml(service, servicePrefix, path)

    return parseTopSitesListCountriesToJson(processedXml)
}

export const ats = { getTopSitesListCountries, getTopSitesCountry }
