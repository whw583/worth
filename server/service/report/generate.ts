import {
    totalPageViewsPerMillionPerDay,
    revenuePerPageView,
} from '../../config/config'

export function getReportStatistics(usageStatistics: Array<any>): Array<any> {
    const timeRangeArr = [
        { timeRange: 365, dataRefIndex: 0 },
        { timeRange: 90, dataRefIndex: 0 },
        { timeRange: 30, dataRefIndex: 1 },
        { timeRange: 7, dataRefIndex: 2 },
        { timeRange: 1, dataRefIndex: 3 },
    ]

    const reportStatistics = timeRangeArr.map(function(value) {
        const { timeRange, dataRefIndex } = value
        const usageStatistic = usageStatistics[dataRefIndex]
            ? usageStatistics[dataRefIndex]
            : usageStatistics[0]

        //

        const perMillion = usageStatistic.pageViews.perMillion.value
        const perUser = usageStatistic.pageViews.perUser.value

        const pageViewsPerMillionValue = Number(perMillion.split(',').join(''))

        const pageViewsPerUserValue = Number(perUser.split(',').join(''))

        // log

        // generate
        let uniquePageViews = Math.round(
            pageViewsPerMillionValue *
                totalPageViewsPerMillionPerDay *
                timeRange
        )

        let uniqueVisitors = Math.round(uniquePageViews / pageViewsPerUserValue)

        let revenue = Math.round(uniquePageViews * revenuePerPageView)

        // if perMillion or perUser data not exit
        if (perMillion === '' || perUser === '%') {
            uniquePageViews = -1
            uniqueVisitors = -1
            revenue = -1
        }

        const obj = { uniquePageViews, uniqueVisitors, revenue, timeRange }

        return obj
    })

    return reportStatistics
}

export function getTotalWorth(
    linksInCount: any,
    siteData: any,
    reportStatistics: any[]
): number {
    // links worth
    const linksInCountWorth = linksInCount ? linksInCount * 100 : 0

    // time worth
    const onlineSinceTimestamp =
        siteData.onlineSince.length > 0
            ? new Date(siteData.onlineSince).getTime()
            : Date.now()

    const websiteAgeDays =
        (Date.now() - onlineSinceTimestamp) / (1000 * 3600 * 24)

    const websiteAgeDaysWorth = Math.round(websiteAgeDays * 0.5)

    // page views 6 year worth
    const OneYearRevenue = reportStatistics[0].revenue
    const PAGE_VIEW_WORTH = OneYearRevenue > 0 ? OneYearRevenue * 6 : 0

    // 10 is the minimum worth
    const BASE_WORTH = 10

    // for each site + 6 year revenue + link count worth + age worth
    const websiteWorth =
        PAGE_VIEW_WORTH + linksInCountWorth + websiteAgeDaysWorth + BASE_WORTH

    return websiteWorth
}

//
export function generate(urlInfo: object): object {
    // was used to generate report
    const { usageStatistics, linksInCount, siteData } = urlInfo as any

    //
    const reportStatistics = getReportStatistics(usageStatistics)

    //
    const websiteWorth = getTotalWorth(linksInCount, siteData, reportStatistics)

    const report = { websiteWorth, reportStatistics }

    return report
}
