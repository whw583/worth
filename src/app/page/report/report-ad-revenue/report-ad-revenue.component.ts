import { Component, Input } from '@angular/core'
import {
    IReportData,
    IReportStatistic,
} from '../../../core/report/report-data.interface'

@Component({
    selector: 'app-report-ad-revenue',
    templateUrl: './report-ad-revenue.component.html',
    styleUrls: ['./report-ad-revenue.component.scss'],
})
export class ReportAdRevenueComponent {
    @Input()
    set reportData(value: IReportData) {
        if (value) {
            this.dataSource = value.report.reportStatistics.reverse()
        } else {
            this.dataSource = []
        }
    }

    displayedColumns: string[] = [
        'timeRange',
        'revenue',
        'uniqueVisitors',
        'uniquePageViews',
    ]
    dataSource: IReportStatistic[] = []
}
