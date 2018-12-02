export interface IReportData {
    dataUrl: string
    siteData: {
        title: string
        description: string
        onlineSince: string
    }
    rank: number
    lastModified: number
    now: number
    report: {
        websiteWorth: number
        reportStatistics: Array<IReportStatistic>
    }
    usageStatistics: Array<IUsageStatistic>
}

interface IReportStatistic {
    uniquePageViews: Number
    uniqueVisitors: Number
    revenue: Number
    timeRange: Number
}

interface IUsageStatistic {
    timeRange: {
        months?: string
        days?: string
    }

    rank: {
        value: string
        delta: string
    }

    reach: {
        rank: {
            value: string
            delta: string
        }
        perMillion: {
            value: string
            delta: string
        }
    }

    pageViews: {
        perMillion: {
            value: string
            delta: string
        }
        rank: {
            value: string
            delta: string
        }

        perUser: {
            value: string
            delta: string
        }
    }
}
