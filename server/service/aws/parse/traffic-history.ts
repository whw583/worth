import { loadXml, getText } from '../common'

export function parseTrafficHistoryToJson(processedXml: string): object {
    const $ = loadXml(processedXml)

    const trafficHistory = $('historicalData data')
        .map(function(index, element) {
            const date = $(element)
            return {
                date: getText(date, 'date'),
                pageViews: {
                    perMillion: getText(date, 'pageViews perMillion'),
                    perUser: getText(date, 'pageViews perUser'),
                },
                rank: getText(date, 'rank'),
                reach: {
                    perMillion: getText(date, 'reach perMillion'),
                },
            }
        })
        .get()

    return { trafficHistory }
}
