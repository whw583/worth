import { loadXml, getText } from '../common'

export function parseCategoryListingsToJson(processedXml: string): object {
    const $ = loadXml(processedXml)

    const categoryListings = $('categoryListings').first()

    //
    const recursiveCount = getText(categoryListings, 'recursiveCount')
    const count = getText(categoryListings, 'count')

    const listings = categoryListings
        .find('listings listing')
        .map(function(index, element) {
            const listing = $(element)

            return {
                dataUrl: getText(listing, 'dataUrl'),
                title: getText(listing, 'title'),
                popularityRank: getText(listing, 'popularityRank'),
                description: getText(listing, 'description'),
            }
        })
        .get()

    const obj = { recursiveCount, count, listings }
    return obj
}
