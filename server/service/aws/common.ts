import { load } from 'cheerio'
export function loadXml(processedXml: string): CheerioStatic {
    const $ = load(processedXml, {
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: false,
    })

    // if not success throw error
    const successText = getText($('responseStatus').first(), 'statusCode')

    if (successText !== 'Success') {
        throw new Error(
            'responseStatus statusCode is not Success. Do not parse url info xml to json.'
        )
    }

    return $
}

// get one text
export function getText(where: Cheerio, selector: string): string {
    return where
        .find(selector)
        .first()
        .text()
}
