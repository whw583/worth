import { loadXml, getText } from '../common'

export function parseTopSitesListCountriesToJson(processedXml: string): object {
    const $ = loadXml(processedXml)
    const countries = $('topSites > countries > country ')
        .map(function(index, element) {
            const country = $(element)
            return {
                name: getText(country, 'name'),
                code: getText(country, 'code'),
                totalSites: getText(country, 'totalSites'),
            }
        })
        .get()

    return { countries }
}
