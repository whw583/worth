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
        const pageViewsPerMillionValue = Number(
            usageStatistic.pageViews.perMillion.value.split(',').join('')
        )

        const pageViewsPerUserValue = Number(
            usageStatistic.pageViews.perUser.value.split(',').join('')
        )

        // generate
        const uniquePageViews =
            Math.round(
                pageViewsPerMillionValue *
                    totalPageViewsPerMillionPerDay *
                    timeRange
            ) || 0

        const uniqueVisitors =
            Math.round(uniquePageViews / pageViewsPerUserValue) || 0

        const revenue = Math.round(uniquePageViews * revenuePerPageView)

        const obj = { uniquePageViews, uniqueVisitors, revenue, timeRange }

        return obj
    })

    return reportStatistics
}

//
export function generate(urlInfo: object): object {
    // was used to generate report
    const {
        dataUrl,
        usageStatistics,
        linksInCount,
        siteData,
        rank,
        lastModified,
    } = urlInfo as any

    //
    const reportStatistics = getReportStatistics(usageStatistics)

    const linksInCountWorth = linksInCount ? linksInCount * 100 : 0

    const onlineSinceTimestamp =
        siteData.onlineSince.length > 0
            ? new Date(siteData.onlineSince).getTime()
            : Date.now()

    const websiteAgeDays =
        (Date.now() - onlineSinceTimestamp) / (1000 * 3600 * 24)

    const websiteAgeDaysWorth = Math.round(websiteAgeDays * 0.5)

    // 10 is the minimum worth for each site + 6 year revenue + link count worth + age worth
    const BASE_WORTH = 10
    const PAGE_VIEW_WORTH = reportStatistics[0].revenue * 6
    const websiteWorth =
        PAGE_VIEW_WORTH + linksInCountWorth + websiteAgeDaysWorth + BASE_WORTH

    //

    const report = { websiteWorth, reportStatistics }

    const now = Date.now()

    return {
        dataUrl,
        siteData,
        rank,
        lastModified,
        now,
        report,
        usageStatistics,
    }
}
