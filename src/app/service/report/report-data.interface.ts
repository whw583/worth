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
    contributingSubdomains: Array<IContributingSubdomain>
    rankByCountry: Array<IRankByCountryElement>
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

interface IContributingSubdomain {
    dataUrl: string
    timeRange: {
        months: string
    }
    reach: {
        percentage: string
    }
    pageViews: {
        percentage: string
        perUser: string
    }
}

interface IRankByCountryElement {
    code: string
    contribution: {
        pageViews: string
        users: string
    }
}
