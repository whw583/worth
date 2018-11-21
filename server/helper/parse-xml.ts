import { load } from 'cheerio'

export function parseUrlInfoXMLToJson(processedXml: string): object {
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

    //
    const alexa = $('alexa')
    const contentData = alexa.find('contentData').first()
    const related = alexa.find('related').first()
    const trafficData = alexa.find('trafficData').first()

    // dataUrl
    const dataUrl = getText(contentData, 'dataUrl')

    // siteData
    const siteData = {
        title: getText(contentData, 'siteData title'),
        description: getText(contentData, 'siteData description'),
        onlineSince: getText(contentData, 'siteData onlineSince'),
    }

    // speed
    const speed = {
        medianLoadTime: getText(contentData, 'speed  medianLoadTime'),
        percentile: getText(contentData, 'speed percentile '),
    }

    //
    const adultContent = getText(contentData, 'adultContent')

    //
    const language = { locale: getText(contentData, 'language locale') }

    //
    const linksInCount = getText(contentData, 'linksInCount')

    //
    const ownedDomains = contentData
        .find('ownedDomains ownedDomain')
        .map(function(index, element) {
            const ownedDomain = $(element)
            return {
                domain: getText(ownedDomain, 'domain'),
                title: getText(ownedDomain, 'title'),
            }
        })
        .get()

    // related
    //
    const categories = related
        .find(' categories  categoryData')
        .map(function(index, element) {
            const categoryData = $(element)
            return {
                title: getText(categoryData, 'title'),
                absolutePath: getText(categoryData, 'absolutePath'),
            }
        })
        .get()

    // traffic data
    //
    const rank = getText(trafficData, 'rank')

    //
    const rankByCountry = trafficData
        .find('rankByCountry  country')
        .map(function(index, element) {
            const country = $(element)
            return {
                code: country.attr('code'),
                contribution: {
                    pageViews: getText(country, 'contribution pageViews '),
                    users: getText(country, 'contribution  users'),
                },
            }
        })
        .get()

    //
    const usageStatistics = trafficData
        .find('usageStatistics usageStatistic')
        .map(function(index, element) {
            const usageStatistic = $(element)

            // like months day
            const timeRange = usageStatistic.find('timeRange').children()[0]
                .name
            //
            return {
                timeRange: {
                    [timeRange]: getText(usageStatistic, 'timeRange  > *'),
                },
                rank: {
                    value: getText(usageStatistic, 'rank value'),
                    delta: getText(usageStatistic, 'rank delta'),
                },
                reach: {
                    rank: {
                        value: getText(usageStatistic, 'reach rank value'),
                        delta: getText(usageStatistic, 'reach  rank delta'),
                    },
                    perMillion: {
                        value: getText(
                            usageStatistic,
                            'reach perMillion  value'
                        ),
                        delta: getText(
                            usageStatistic,
                            'reach perMillion   delta'
                        ),
                    },
                },

                pageViews: {
                    perMillion: {
                        value: getText(
                            usageStatistic,
                            'pageViews perMillion value'
                        ),
                        delta: getText(
                            usageStatistic,
                            'pageViews perMillion delta'
                        ),
                    },
                    rank: {
                        value: getText(usageStatistic, 'pageViews rank value'),
                        delta: getText(usageStatistic, 'pageViews rank delta'),
                    },
                    perUser: {
                        value: getText(
                            usageStatistic,
                            'pageViews perUser value'
                        ),
                        delta: getText(
                            usageStatistic,
                            'pageViews perUser delta'
                        ),
                    },
                },
            }
        })
        .get()

    //
    const contributingSubdomains = trafficData
        .find('contributingSubdomains contributingSubdomain')
        .map(function(index, element) {
            const contributingSubdomain = $(element)
            // like months day
            const timeRange = contributingSubdomain
                .find('timeRange')
                .children()[0].name

            //
            return {
                dataUrl: getText(contributingSubdomain, 'dataUrl'),
                timeRange: {
                    [timeRange]: getText(
                        contributingSubdomain,
                        'timeRange  > * '
                    ),
                },
                reach: {
                    percentage: getText(
                        contributingSubdomain,
                        'reach percentage'
                    ),
                },
                pageViews: {
                    percentage: getText(
                        contributingSubdomain,
                        'pageViews percentage'
                    ),
                    perUser: getText(
                        contributingSubdomain,
                        'pageViews  perUser'
                    ),
                },
            }
        })
        .get()

    // the whole object to return
    const obj = {
        dataUrl,
        siteData,
        speed,
        adultContent,
        language,
        linksInCount,
        ownedDomains,
        rank,
        rankByCountry,
        categories,
        usageStatistics,
        contributingSubdomains,
    }

    return obj
}

// get one text
function getText(where: Cheerio, selector: string): string {
    return where
        .find(selector)
        .first()
        .text()
}
