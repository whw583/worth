import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
} from '@angular/core'
import {
    IReportData,
    IUsageStatistic,
} from '../../service/report/report-data.interface'
import { Chart } from 'chart.js'
@Component({
    selector: 'app-report-alexa-rank',
    templateUrl: './report-alexa-rank.component.html',
    styleUrls: ['./report-alexa-rank.component.scss'],
})
export class ReportAlexaRankComponent implements OnInit, AfterViewInit {
    @ViewChild('myChartRef')
    myChartRef: ElementRef<HTMLCanvasElement>

    chart: Chart
    usageStatistics: IUsageStatistic[] = []
    @Input()
    set reportData(reportData: IReportData) {
        if (reportData) {
            this.usageStatistics = this.usageStatistics
        } else {
            this.usageStatistics = []
        }
    }

    constructor() {}

    getData() {
        const newestEle = this.usageStatistics[this.usageStatistics.length - 1]
        const labels = ['90', '30', '7', '1']
        const dataArr = []
        for (let i = 0; i < 3; i++) {
            let element = this.usageStatistics[i]
            if (!element) {
                element = newestEle
            }
            const label = labels[i]
            const rank = element.rank
            dataArr.push({ label, rank })
        }
    }

    ngOnInit() {}

    createChart() {
        const ctx = this.myChartRef.nativeElement.getContext('2d')
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
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
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        })
    }

    ngAfterViewInit(): void {
        this.createChart()
        console.log('ng after view init')
        console.log(this.chart)
    }
}
