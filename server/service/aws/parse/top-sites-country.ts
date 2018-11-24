import { loadXml, getText } from '../common'

export function parseTopSitesCountryToJson(processedXml: string): object {
    const $ = loadXml(processedXml)
    const topSitescountry = $('topSites >  country').first()

    const sites = topSitescountry
        .find('> sites > site')
        .map(function(index, element) {
            const site = $(element)
            return {
                dataUrl: getText(site, 'dataUrl'),
                country: {
                    rank: getText(site, 'country rank'),
                    reach: {
                        perMillion: getText(site, 'country reach perMillion'),
                    },
                    pageViews: {
                        perMillion: getText(
                            site,
                            'country pageViews perMillion'
                        ),
                        perUser: getText(site, 'country pageViews perUser'),
                    },
                },
                global: {
                    rank: getText(site, 'global rank'),
                },
            }
        })
        .get()

    const obj = {
        countryName: getText(topSitescountry, '> countryName'),
        countryCode: getText(topSitescountry, '>  countryCode'),
        totalSites: getText(topSitescountry, '> totalSites'),
        sites,
    }

    return obj
}
