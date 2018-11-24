import { loadXml, getText } from '../common'

export function parseSitesLinkingInToJson(processedXml: string): object {
    const $ = loadXml(processedXml)

    const sitesLinkingIn = $('sitesLinkingIn site ')
        .map(function(index, element) {
            const site = $(element)
            return { title: getText(site, 'title'), url: getText(site, 'url') }
        })
        .get()

    return { sitesLinkingIn }
}
