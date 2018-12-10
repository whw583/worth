import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    OnDestroy,
} from '@angular/core'
import {
    IReportData,
    IUsageStatistic,
} from '../../service/report/report-data.interface'
import { Chart } from 'chart.js'
import { ReplaySubject } from 'rxjs'

@Component({
    selector: 'app-report-alexa-rank',
    templateUrl: './report-alexa-rank.component.html',
    styleUrls: ['./report-alexa-rank.component.scss'],
})
export class ReportAlexaRankComponent
    implements OnInit, AfterViewInit, OnDestroy {
    viewChildSubject = new ReplaySubject(1)
    @ViewChild('myChartRef')
    myChartRef: ElementRef<HTMLCanvasElement>

    chart: Chart
    @Input()
    set reportData(reportData: IReportData) {
        if (reportData) {
            this.viewChildSubject.subscribe(value => {
                this.createChart(reportData.usageStatistics)
            })
        }
    }

    constructor() {}

    ngOnInit() {}

    createChart(usageStatistics: IUsageStatistic[]) {
        if (this.chart) {
            this.chart.destroy()
        }

        const data = usageStatistics.map(value => Number(value.rank.value))

        const ctx = this.myChartRef.nativeElement.getContext('2d')
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['90 days', '30 days', '7 days', '1 day'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {},
        })
    }

    ngAfterViewInit(): void {
        this.viewChildSubject.next(true)
    }

    ngOnDestroy(): void {
        this.viewChildSubject.complete()
    }
}
