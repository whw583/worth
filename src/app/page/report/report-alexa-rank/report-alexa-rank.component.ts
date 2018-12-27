import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    OnDestroy,
    Inject,
    PLATFORM_ID,
    HostListener,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import {
    IReportData,
    IUsageStatistic,
} from '../../../core/report/report-data.interface'
import { Chart } from 'chart.js'
import { isPlatformBrowser } from '@angular/common'
import { ReplaySubject } from 'rxjs'
import { take } from 'rxjs/operators'

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
    usageStatistics: IUsageStatistic[]

    @Input()
    set reportData(reportData: IReportData) {
        if (reportData) {
            this.viewChildSubject.pipe(take(1)).subscribe(value => {
                this.usageStatistics = reportData.usageStatistics
                this.createChart()
            })
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.createChart()
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit() {}

    createChart() {
        // only run in browser for angular universal ssr
        if (!isPlatformBrowser(this.platformId)) {
            return
        }

        if (this.chart) {
            this.chart.destroy()
        }

        if (!this.usageStatistics) {
            return
        }

        const data = this.usageStatistics.map(value => Number(value.rank.value))

        const ctx = this.myChartRef.nativeElement.getContext('2d')
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['90 days', '30 days', '7 days', '1 day'],
                datasets: [
                    {
                        fill: false,
                        label: 'Recent Alexa Rank',
                        backgroundColor: 'rgba(247, 212, 168, 0.2)',
                        borderColor: 'steelblue',
                        data: data,
                    },
                ],
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                reverse: true,
                                suggestedMin: 1,
                                callback: (
                                    value: number,
                                    index: number,
                                    values: any
                                ) => {
                                    if (value > 0 && Number.isInteger(value)) {
                                        return value
                                    }
                                },
                            },
                        },
                    ],
                },
            },
        })
    }

    ngAfterViewInit(): void {
        this.viewChildSubject.next(true)
    }

    ngOnDestroy(): void {
        this.viewChildSubject.complete()
    }
}
